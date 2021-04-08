import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
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

export default routes;
