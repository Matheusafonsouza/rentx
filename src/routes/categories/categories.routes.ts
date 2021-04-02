import { Router } from 'express';

import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { CreateCategoryService } from '../../services/CreateCategoryService';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategory = new CreateCategoryService(categoriesRepository);

  const category = createCategory.execute({ name, description });

  return response.status(201).json(category);
});

categoriesRoutes.get('/', (request, response) => {
  const categories = categoriesRepository.list();

  return response.status(200).json(categories);
});

export { categoriesRoutes };
