import Router from 'express';

import OfferController from '../controllers/OfferController';

const routes = Router();

routes.get('/', OfferController.index);

export default routes;
