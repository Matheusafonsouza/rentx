import { CategoriesRepositoryMock } from '@modules/cars/repositories/mocks/CategoriesRepositoryMock';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryMock: CategoriesRepositoryMock;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryMock = new CategoriesRepositoryMock();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryMock);
  });

  it('Should be able to create a new category', async () => {
    const category = {
      description: 'cars category',
      name: 'car',
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryMock.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('Should not be able to create an already created category', async () => {
    expect(async () => {
      const category = {
        description: 'cars category',
        name: 'car',
      };

      await createCategoryUseCase.execute(category);

      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
