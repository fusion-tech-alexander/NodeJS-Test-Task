import { Repository } from 'typeorm';

import AppDataConnection from '../../db/data-connection';
import { User } from '../../db/entities/User';
import { IUser } from "./user.interface";
import { bcryptHelper } from "../../helpers/bcryptHelper";


export function UserService () {
  const usersRepository: Repository<User> = AppDataConnection.getRepository(User);

  return {
    async createUser(body: IUser) {
      const { userName, firstName, lastName, email, password } = body;

      const hashPassword = await bcryptHelper.createHash(password);

      const user = new User({
        userName,
        firstName,
        lastName,
        email,
        password: hashPassword,
      })

      const createdUser = await usersRepository.save(user);

      return {
        id: createdUser.id,
        userName: createdUser.userName,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        createdAt: createdUser.createdAt,
      };
    },
    async getUser() {
      const users = await usersRepository.find();

      return users;
    }
  };
}
