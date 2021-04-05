import { Specification } from '../entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create(data: ICreateSpecificationDTO): Specification;
  list(): Specification[];
  findByName(name: string): Specification;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
