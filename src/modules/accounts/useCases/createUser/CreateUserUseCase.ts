import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    password,
    email,
    driver_license,
    name,
  }: ICreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      password: hashedPassword,
      email,
      driver_license,
      name,
    });
    return user;
  }
}

export { CreateUserUseCase };
