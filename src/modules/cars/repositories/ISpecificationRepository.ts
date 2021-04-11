import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create(data: ICreateSpecificationDTO): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
