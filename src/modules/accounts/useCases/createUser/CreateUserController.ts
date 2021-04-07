import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request;

    const createUserUseCase = container.resolve(CreateUserUseCase);
    const category = await createUserUseCase.execute(body);

    return response.status(201).json(category);
  }
}

export { CreateUserController };
