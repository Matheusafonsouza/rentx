import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { carsRoutes } from './cars/cars.routes';
import { categoriesRoutes } from './categories/categories.routes';
import { sessionRoutes } from './session/session.routes';
import { specificationsRoutes } from './specifications/specifications.routes';
import { usersRoutes } from './users/users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use(sessionRoutes);

routes.use(ensureAuthenticated);

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/cars', carsRoutes);

export default routes;
