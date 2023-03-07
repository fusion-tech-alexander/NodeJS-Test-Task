import express, { Router } from 'express';
import { UserController } from "./user.controller";

export function UserRouter(): Router {
  const router = express.Router();
  const userController = UserController();

  router.post('/', userController.createUser);
  router.get('/', userController.getUser);

  return router;
}
