import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create category controller', () => {
  it('Should be ablle to create a category', async () => {
    await request(app).get('/categories').expect(201);
  });
});
