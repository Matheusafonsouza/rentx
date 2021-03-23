import { Router } from 'express';

import { categoriesRoutes } from './categories/categories.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);

export default routes;
