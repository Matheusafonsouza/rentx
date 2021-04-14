import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryMock: CarsRepositoryMock;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryMock);
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryMock.create({
      description: 'test car description',
      name: 'test car',
      brand: 'test',
      category_id: 'category_id',
      daily_rate: 60,
      fine_amount: 100,
      license_plate: 'abc-1244',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryMock.create({
      description: 'test car description',
      name: 'test car',
      brand: 'brand_test',
      category_id: 'category_id',
      daily_rate: 60,
      fine_amount: 100,
      license_plate: 'abc-1244',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'brand_test',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category', async () => {
    const car = await carsRepositoryMock.create({
      description: 'test car description',
      name: 'test car',
      brand: 'brand',
      category_id: 'category_id_test',
      daily_rate: 60,
      fine_amount: 100,
      license_plate: 'abc-1244',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_id_test',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryMock.create({
      description: 'test car description',
      name: 'test car',
      brand: 'brand',
      category_id: 'category_id',
      daily_rate: 60,
      fine_amount: 100,
      license_plate: 'abc-1244',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'test car',
    });

    expect(cars).toEqual([car]);
  });
});
