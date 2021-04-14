import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ brand, name, category_id }: IRequest): Promise<Car[]> {
    const availableCars = await this.carsRepository.findAvailable(
      brand,
      category_id,
      name
    );
    return availableCars;
  }
}

export { ListCarsUseCase };
