import { Router } from 'express';
import StatusCodes from 'http-status-codes';
import { isProd } from '../config';
import { UserRouter } from "./user/user.router";
import HttpErrors from "../helpers/httpErrors";

export function RootRouter(): Router {
  const router = Router();
  const userRouter = UserRouter();

  router.use('/test', (req, res) => res.status(StatusCodes.OK).send('it works'));
  router.use('/users', userRouter);

  router.use((error, req, res, next) => {
    let message;
    if (error instanceof HttpErrors) {
      message = error.data;
    } else if (isProd) {
      message = 'Something went wrong. Please try again later';
    } else {
      message = error.message;
    }

    error.code = Object.values(StatusCodes).includes(error.code) ? error.code : StatusCodes.INTERNAL_SERVER_ERROR;

    res.status(error.code).json(message);
  });

  return router;
}
