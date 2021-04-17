import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create category controller', () => {
  it('Should be able to create a category', async () => {
    const response = await request(app).get('/categories').send({
      name: 'category test',
      description: 'category test description',
    });

    expect(response.status).toBe(201);
  });
});
