import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryMock } from '@modules/accounts/repositories/mocks/UsersRepositoryMock';
import { UsersTokensRepositoryMock } from '@modules/accounts/repositories/mocks/UsersTokensRepositoryMock';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUsecase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryMock: UsersRepositoryMock;
let usersTokensRepositoryMock: UsersTokensRepositoryMock;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    usersRepositoryMock = new UsersRepositoryMock();
    usersTokensRepositoryMock = new UsersTokensRepositoryMock();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryMock,
      usersTokensRepositoryMock,
      dateProvider
    );
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
    await expect(
      authenticateUserUseCase.execute({
        email: 'user@email.com',
        password: '123123123',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect.'));
  });

  it('Should not be able to authenticate with wrong password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '001032',
      email: 'user@test.com',
      name: 'matheus',
      password: '123123123',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect.'));
  });

  it('Should not be able to authenticate with wrong email', async () => {
    const user: ICreateUserDTO = {
      driver_license: '001032',
      email: 'user@test.com',
      name: 'matheus',
      password: '123123123',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: 'wrong-email@email.com',
        password: user.password,
      })
    ).rejects.toEqual(new AppError('Email or password incorrect.'));
  });
});
