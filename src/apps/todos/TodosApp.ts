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

type ClientUser = Omit<User, 'password'>;

class TodosApp {
  list(): Promise<ClientUser[]> {
    const all = listUsers().then((users) => {
      return users.map((user) => {
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          email: user.email,
          todos: user.todos,
          createdDate: user.createdDate,
          id: user.id,
        };
      });
    });
    return all;
  }

  findById(id: string): Promise<ClientUser> {
    const user = findUser(id);
    return user;
  }

  findByEmail(email: string): Promise<ClientUser> {
    const user = findUserByEmail(email);
    return user;
  }

  findByEmailIntern(email: string): Promise<User> {
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
