import { Router } from 'express';

import { categoriesRoutes } from './categories/categories.routes';
import { sessionRoutes } from './session/session.routes';
import { specificationsRoutes } from './specifications/specifications.routes';
import { usersRoutes } from './users/users.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);
routes.use(sessionRoutes);

export default routes;
