import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';
import { SpecificationRepositoryMock } from '@modules/cars/repositories/mocks/SpecificationRepositoryMock';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryMock: CarsRepositoryMock;
let specificationRepositoryMock: SpecificationRepositoryMock;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock();
    specificationRepositoryMock = new SpecificationRepositoryMock();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryMock,
      specificationRepositoryMock
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

    const specification = await specificationRepositoryMock.create({
      description: 'test description',
      name: 'test name',
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
