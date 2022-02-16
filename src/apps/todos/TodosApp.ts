import { Request } from 'express';
import { v4 as uuid } from 'uuid';

import {
  createUser,
  findUser,
  findUserByEmail,
  listUsers,
} from '../../database/users/users.statics';
import { User } from '../../interfaces/User';

class TodosApp {
  list(): Promise<User[]> {
    const all = listUsers();
    return all;
  }

  findById(id: string): Promise<User> {
    const user = findUser(id);
    return user;
  }

  findByEmail(email: string): Promise<User> {
    const user = findUserByEmail(email);
    return user;
  }

  create(req: Request): Promise<User> {
    const { firstName, lastName, fullName, email } = req.body;

    const newUser: User = {
      firstName,
      lastName,
      fullName,
      email,
      createdDate: new Date(),
      id: uuid(),
      todos: [],
    };

    const user = createUser(newUser);
    return user;
  }
}

export const todosApp = new TodosApp();
