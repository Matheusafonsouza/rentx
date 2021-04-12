import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  brand: string;
  category_id: string;
}

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    description,
    name,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
  }: IRequest): Promise<Car> {
    const carPlateAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carPlateAlreadyExists) {
      throw new AppError('Car already exists!');
    }

    const car = await this.carsRepository.create({
      description,
      name,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      brand,
    });
    return car;
  }
}

export { CreateCarUseCase };
