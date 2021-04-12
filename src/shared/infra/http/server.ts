import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes/index';

import 'express-async-errors';

import swaggerFile from '../../../swagger.json';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log('Server is running on port 3333!'));