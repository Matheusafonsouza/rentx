import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

import { ensureAdmin } from '../../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const upload = multer(uploadConfig);

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle
);

categoriesRoutes.get('/', listCategoriesController.handle);

export { categoriesRoutes };
