import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    username,
    password,
    email,
    driver_license,
    name,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.usersRepository.create({
      username,
      password,
      email,
      driver_license,
      name,
    });
    return user;
  }
}

export { CreateUserUseCase };
