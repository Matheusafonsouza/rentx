import { Router } from 'express';

import { categoriesRoutes } from './categories/categories.routes';
import { specificationsRoutes } from './specifications/specifications.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);

export default routes;
