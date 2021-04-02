import { Specification } from '../model/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../repositories/ISpecificationRepository';

class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ name, description }: ICreateSpecificationDTO): Specification {
    const specificationAlreadyExists = this.specificationRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists.');
    }

    const specification = this.specificationRepository.create({
      description,
      name,
    });

    return specification;
  }
}

export { CreateSpecificationService };
