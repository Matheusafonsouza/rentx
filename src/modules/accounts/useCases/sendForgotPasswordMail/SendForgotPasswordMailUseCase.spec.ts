import { UsersRepositoryMock } from '@modules/accounts/repositories/mocks/UsersRepositoryMock';
import { UsersTokensRepositoryMock } from '@modules/accounts/repositories/mocks/UsersTokensRepositoryMock';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderMock } from '@shared/container/providers/DateProvider/mock/MailProviderMock';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryMock: UsersRepositoryMock;
let usersTokensRepositoryMock: UsersTokensRepositoryMock;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderMock;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    usersTokensRepositoryMock = new UsersTokensRepositoryMock();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderMock();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryMock,
      usersTokensRepositoryMock,
      dateProvider,
      mailProvider
    );
  });

  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    const user = await usersRepositoryMock.create({
      driver_license: '006641',
      email: 'hi@mukcesep.im',
      name: 'Fanny Robinson',
      password: '123123',
    });

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('af@rozog.lc')
    ).rejects.toEqual(new AppError('User does not exists.'));
  });

  it('Should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryMock, 'create');

    const user = await usersRepositoryMock.create({
      driver_license: '006641',
      email: 'zu@nottebtep.bf',
      name: 'Fanny Robinson',
      password: '123123',
    });

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
