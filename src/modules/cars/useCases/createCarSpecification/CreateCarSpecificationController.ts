import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { specifications_id } = request.body;
    const { id } = request.params;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const carSpecification = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.status(201).json(carSpecification);
  }
}

export { CreateCarSpecificationController };
