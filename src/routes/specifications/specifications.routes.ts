import { Router } from 'express';

import { SpecificationRepository } from '../../modules/cars/repositories/SpecificationRepository';
import { CreateSpecificationService } from '../../modules/cars/services/CreateSpecificationService';

const specificationsRoutes = Router();

const specificationRepository = new SpecificationRepository();

specificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategory = new CreateSpecificationService(
    specificationRepository
  );

  const category = createCategory.execute({ name, description });

  return response.status(201).json(category);
});

specificationsRoutes.get('/', (request, response) => {
  const categories = specificationRepository.list();

  return response.status(200).json(categories);
});

export { specificationsRoutes };
