import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryMock: CarsRepositoryMock;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryMock
    );
  });

  it('Should not be able to add a new specification to an non existing car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['12312'];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryMock.create({
      description: 'test description',
      name: 'test',
      brand: 'brand',
      category_id: 'category',
      daily_rate: 60,
      fine_amount: 100,
      license_plate: 'abc-1234',
    });

    const specifications_id = ['12312'];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
