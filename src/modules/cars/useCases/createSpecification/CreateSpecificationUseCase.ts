import { Specification } from '../../model/Specification';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): Specification {
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

export { CreateSpecificationUseCase };
