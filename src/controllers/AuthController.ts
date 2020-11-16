import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '@src/models/User';
import userView from '@src/views/user';

export default {
  async authenticate(req: Request, res: Response): Promise<any> {
    const userRepository = getRepository(User);
    const { email, password } = req.body;

    try {
      const user = await userRepository.findOne({ where: { email } });

      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (isValidPassword) {
          const token = await jwt.sign({ id: user.id }, '.ENV_CONFIGURATION', {
            expiresIn: '1d',
          });

          return res.status(200).json({
            user: userView.render(user),
            token,
          });
        }
      }

      res.status(401).json({ error: 'Not authorized' });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
