import Router from 'express';

import AuhtController from '../controllers/AuthController';

const routes = Router();

routes.post('/authentication', AuhtController.authenticate);

export default routes;
