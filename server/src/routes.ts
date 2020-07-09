import express, { response } from 'express';

import CourtsController from './controllers/CourtsController';
import CharacteristicsController from './controllers/CharacteristicsController';

const routes = express.Router();
const courtsController = new CourtsController();
const characteristicsController = new CharacteristicsController();

routes.get('/characteristics', characteristicsController.index);

routes.post('/courts', courtsController.create);
routes.get('/courts', courtsController.index);
routes.get('/courts/:id',courtsController.show)

export default routes;