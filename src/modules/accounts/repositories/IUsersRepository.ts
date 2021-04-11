import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  save(user: User): Promise<User>;
}

export { IUsersRepository };
