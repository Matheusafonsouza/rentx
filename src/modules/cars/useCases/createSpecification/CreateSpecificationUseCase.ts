import { inject, injectable } from 'tsyringe';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists.');
    }

    const specification = await this.specificationRepository.create({
      description,
      name,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };
