import { Request } from 'express';
import { v4 as uuid } from 'uuid';

import {
  handlePasswordHash,
  hidePassword,
} from '../../database/users/users.methods';
import {
  createUser,
  deleteUser,
  findUser,
  findUserByEmail,
  listUsers,
} from '../../database/users/users.statics';
import { ClientUser, User } from '../../interfaces/User';

class TodosApp {
  list(): Promise<ClientUser[]> {
    const all = listUsers().then((users) => {
      return users.map((user) => {
        return hidePassword(user);
      });
    });
    return all;
  }

  findById(id: string): Promise<ClientUser> {
    const user = findUser(id).then((user) => {
      console.debug(`User Found By Id >> ${JSON.stringify(user)}`);
      if (user) return hidePassword(user);

      return user;
    });
    return user;
  }

  findByEmail(email: string): Promise<ClientUser> {
    const user = findUserByEmail(email).then((user) => {
      return hidePassword(user);
    });
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

  delete(id: string): void {
    findUser(id).then((user) => {
      if (user) {
        console.debug(`User Found >> ${user.email}`);
        deleteUser(id);
      }
    });
  }
}

export const todosApp = new TodosApp();
