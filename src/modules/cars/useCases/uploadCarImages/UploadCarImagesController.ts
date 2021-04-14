import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface IImages {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IImages[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map((image) => image.filename);

    const carImages = await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name,
    });

    return response.status(201).json(carImages);
  }
}

export { UploadCarImagesController };
