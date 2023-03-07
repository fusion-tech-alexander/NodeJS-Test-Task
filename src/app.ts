import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import createError from 'http-errors';
import logger from 'morgan';

import { createConnection } from './db/create-connection';
import { RootRouter } from "./modules";

export async function App(): Promise<Express> {
  await createConnection();

  const app = express();
  app.use(logger('dev'));

  const rootRouter = RootRouter();

  app.use(cors({ origin: '*' }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/v1', rootRouter);

  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500).send(res.locals.error);
  });

  return app;
}
