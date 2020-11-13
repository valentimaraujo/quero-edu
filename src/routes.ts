import Router, { Request, Response } from 'express';

import offer from './routes/offer';
import course from './routes/course';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to QueroEducação API!',
    version: 'v.1.0.0',
  });
});

router.use('/offers', offer);
router.use('/courses', course);

export default router;
