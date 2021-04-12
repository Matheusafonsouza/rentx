import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryMock: CarsRepositoryMock;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock();
    createCarUseCase = new CreateCarUseCase(carsRepositoryMock);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      description: 'test description',
      name: 'test',
      brand: 'brand',
      category_id: 'category',
      daily_rate: 60,
      fine_amount: 100,
      license_plate: 'abc-1234',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with exists license place', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        description: 'test description 1',
        name: 'test 1',
        brand: 'brand',
        category_id: 'category',
        daily_rate: 60,
        fine_amount: 100,
        license_plate: 'abc-1234',
      });

      await createCarUseCase.execute({
        description: 'test description 2',
        name: 'test 2',
        brand: 'brand',
        category_id: 'category',
        daily_rate: 60,
        fine_amount: 100,
        license_plate: 'abc-1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      description: 'test description',
      name: 'test',
      brand: 'brand',
      category_id: 'category',
      daily_rate: 60,
      fine_amount: 100,
      license_plate: 'abc-1234',
    });

    expect(car.available).toBe(true);
  });
});
