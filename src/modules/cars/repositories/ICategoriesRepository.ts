import { Category } from '../model/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create(data: ICreateCategoryDTO): Category;
}

export { ICategoriesRepository, ICreateCategoryDTO };
