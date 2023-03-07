import { Request, Response } from 'express';
import { UserService } from "./user.service";
import wrapController from '../../helpers/catchError';

export function UserController () {
  const userService = UserService();

  const controller = {
    async createUser(req: Request, res: Response) {
      const result = await userService.createUser(req.body);
      res.send(result);
    },
    async getUser(req: Request, res: Response) {
      const result = await userService.getUser();
      res.send(result);
    },
  };

  wrapController(controller);

  return controller;
}
