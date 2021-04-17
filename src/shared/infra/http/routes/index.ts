import { Router } from 'express';

import { carsRoutes } from './cars/cars.routes';
import { categoriesRoutes } from './categories/categories.routes';
import { rentalsRouter } from './rentals';
import { sessionRoutes } from './session/session.routes';
import { specificationsRoutes } from './specifications/specifications.routes';
import { usersRoutes } from './users/users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use(sessionRoutes);

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/cars', carsRoutes);
routes.use('/rentals', rentalsRouter);

export default routes;
