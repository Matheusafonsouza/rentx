import { Category } from '../model/category';

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
