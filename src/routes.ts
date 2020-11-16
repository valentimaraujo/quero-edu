import Router, { Request, Response } from 'express';

import auth from './routes/auth';
import offer from './routes/offer';
import course from './routes/course';
import authMiddleware from '@src/middlewares/authMiddleware';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to QueroEducação API!',
    version: 'v.1.0.0',
  });
});

router.use('/user', auth);
router.use('/offers', authMiddleware, offer);
router.use('/courses', authMiddleware, course);

export default router;
