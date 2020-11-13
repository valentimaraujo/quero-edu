import Router from 'express';

import CourseController from '../controllers/CourseController';

const routes = Router();

routes.get('/', CourseController.index);

export default routes;
