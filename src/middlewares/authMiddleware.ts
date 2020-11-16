import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  try {
    if (authorization) {
      const search = 'Bearer';
      const regEx = new RegExp(search, 'ig');

      const token = authorization.replace(regEx, '').trim();
      const data = jwt.verify(token, '.ENV_CONFIGURATION');
      const { id } = data as TokenPayload;
      req.userId = id;
      return next();
    }

    res.status(401).json({ error: 'Access token is missing or invalid' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
