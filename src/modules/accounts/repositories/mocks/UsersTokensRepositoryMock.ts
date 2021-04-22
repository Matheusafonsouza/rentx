import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryMock implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    refresh_token,
    expires_date,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, { refresh_token, expires_date, user_id });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (ut) => ut.id === user_id && ut.refresh_token === refresh_token
    );
    return userToken;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (ut) => ut.refresh_token === refresh_token
    );
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const filteresUsersTokens = this.usersTokens.filter((ut) => ut.id !== id);
    this.usersTokens = filteresUsersTokens;
  }
}

export { UsersTokensRepositoryMock };
