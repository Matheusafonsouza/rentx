import { RentalsRepositoryMock } from '@modules/rentals/repositories/mocks/RentalsRepositoryMock';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryMock;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryMock();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
  });

  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: 'car-id',
      user_id: 'user-id',
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'car-id',
        user_id: 'same-user-id',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        car_id: 'car-id',
        user_id: 'same-user-id',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
