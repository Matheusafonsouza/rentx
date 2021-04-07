import { Router } from 'express';

import { categoriesRoutes } from './categories/categories.routes';
import { specificationsRoutes } from './specifications/specifications.routes';
import { usersRoutes } from './users';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);

export default routes;
