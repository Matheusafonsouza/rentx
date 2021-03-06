import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';

import upload from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes/index';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';

import '@shared/container';

createConnection();
const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

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

export { app };
