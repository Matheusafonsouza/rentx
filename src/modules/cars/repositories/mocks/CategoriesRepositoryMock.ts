import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepositoryMock implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  async list(): Promise<Category[]> {
    const { categories } = this;
    return categories;
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);

    return category;
  }
}

export { CategoriesRepositoryMock };