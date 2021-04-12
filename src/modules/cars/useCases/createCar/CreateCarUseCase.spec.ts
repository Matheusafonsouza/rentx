import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';

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
});
