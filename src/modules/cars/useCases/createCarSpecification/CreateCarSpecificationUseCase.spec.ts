import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';
import { SpecificationsRepositoryMock } from '@modules/cars/repositories/mocks/SpecificationsRepositoryMock';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryMock: CarsRepositoryMock;
let specificationsRepositoryMock: SpecificationsRepositoryMock;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock();
    specificationsRepositoryMock = new SpecificationsRepositoryMock();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryMock,
      specificationsRepositoryMock
    );
  });

  it('Should not be able to add a new specification to an non existing car', async () => {
    const car_id = '1234';
    const specifications_id = ['12312'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError('Car does not exists.'));
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

    const specification = await specificationsRepositoryMock.create({
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
