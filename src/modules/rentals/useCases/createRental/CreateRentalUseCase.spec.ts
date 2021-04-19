import dayjs from 'dayjs';

import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';
import { RentalsRepositoryMock } from '@modules/rentals/repositories/mocks/RentalsRepositoryMock';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryMock: RentalsRepositoryMock;
let carsRepositoryMock: CarsRepositoryMock;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryMock = new RentalsRepositoryMock();
    carsRepositoryMock = new CarsRepositoryMock();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryMock,
      dayjsDateProvider,
      carsRepositoryMock
    );
  });

  it('Should be able to create a new rental', async () => {
    const car = await carsRepositoryMock.create({
      brand: 'test brand',
      daily_rate: 60,
      description: 'car description test',
      name: 'test car',
      category_id: 'test-category-id',
      fine_amount: 100,
      license_plate: 'test',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: 'user-id',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if there is another open to the same user', async () => {
    await rentalsRepositoryMock.create({
      car_id: '123123',
      expected_return_date: dayAdd24Hours,
      user_id: 'same-user-id',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: 'car-id',
        user_id: 'same-user-id',
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('There is a rental in progress for user!'));
  });

  it('Should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryMock.create({
      car_id: 'same-car-id',
      expected_return_date: dayAdd24Hours,
      user_id: 'same-user-id',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: 'same-car-id',
        user_id: 'user-id',
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('Should not be able to create a new rental with invalid return time', async () => {
    const car = await carsRepositoryMock.create({
      description: 'test description',
      name: 'test',
      brand: 'brand',
      category_id: 'category',
      daily_rate: 60,
      fine_amount: 100,
      license_plate: 'abc-1234',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: 'user-id',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Rental must have min 24h diff.'));
  });
});
