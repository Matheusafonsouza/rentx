import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryMock } from '@modules/accounts/repositories/mocks/UsersRepositoryMock';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUsecase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryMock: UsersRepositoryMock;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryMock);
    createUserUseCase = new CreateUserUseCase(usersRepositoryMock);
  });

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '001032',
      email: 'user@test.com',
      name: 'matheus',
      password: '123123123',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate an non-existent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'user@email.com',
        password: '123123123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '001032',
        email: 'user@test.com',
        name: 'matheus',
        password: '123123123',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong email', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '001032',
        email: 'user@test.com',
        name: 'matheus',
        password: '123123123',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'wrong-email@email.com',
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
