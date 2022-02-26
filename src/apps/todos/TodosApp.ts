import { Request } from 'express';
import { v4 as uuid } from 'uuid';

import { handlePasswordHash } from '../../database/users/users.methods';
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

  create(req: Request): void {
    const { firstName, lastName, fullName, email, password } = req.body;

    handlePasswordHash(password).then((pwd) => {
      const newUser: User = {
        firstName,
        lastName,
        fullName,
        email,
        password: pwd,
        id: uuid(),
        createdDate: new Date(),
        todos: [],
      };
      createUser(newUser);
    });
  }
}

export const todosApp = new TodosApp();
