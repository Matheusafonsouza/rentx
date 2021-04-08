import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    user.avatar = avatar_file;

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarUseCase };
