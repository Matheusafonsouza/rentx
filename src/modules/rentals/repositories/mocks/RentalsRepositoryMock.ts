import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryMock implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);
    return rental;
  }

  async save(rental: Rental): Promise<Rental> {
    const rentalId = this.rentals.findIndex((rnt) => rnt.id === rental.id);

    if (rentalId !== -1) {
      this.rentals[rentalId] = rental;
    } else {
      this.rentals.push(rental);
    }

    return rental;
  }
}

export { RentalsRepositoryMock };
