import dayjs from 'dayjs';

import { RentalsRepositoryMock } from '@modules/rentals/repositories/mocks/RentalsRepositoryMock';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryMock;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryMock();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dayjsDateProvider
    );
  });

  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: 'car-id',
      user_id: 'user-id',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'car-id',
        user_id: 'same-user-id',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: 'car-id',
        user_id: 'same-user-id',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'same-car-id',
        user_id: 'user-id',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: 'same-car-id',
        user_id: 'user-id',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'same-car-id',
        user_id: 'user-id',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
