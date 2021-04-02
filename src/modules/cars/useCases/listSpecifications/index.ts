import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository';
import { ListSpecificationsController } from './ListSpecificationsController';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

const specificationsRepository = SpecificationRepository.getInstance();
const listSpecificationsUseCase = new ListSpecificationsUseCase(
  specificationsRepository
);
const listSpecificationController = new ListSpecificationsController(
  listSpecificationsUseCase
);

export { listSpecificationController };
