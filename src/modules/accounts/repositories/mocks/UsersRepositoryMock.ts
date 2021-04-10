import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryMock implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { driver_license, email, name, password });

    this.save(user);

    return user;
  }

  async list(): Promise<User[]> {
    const { users } = this;
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async save(user: User): Promise<User> {
    const userId = this.users.findIndex((usr) => usr.id === user.id);

    if (userId !== -1) {
      this.users[userId] = user;
    } else {
      this.users.push(user);
    }

    return user;
  }
}

export { UsersRepositoryMock };
