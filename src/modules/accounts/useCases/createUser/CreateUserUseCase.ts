import { hash } from 'bcrypt';
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
    password,
    email,
    driver_license,
    name,
  }: ICreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
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
