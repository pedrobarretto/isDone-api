import { v4 as uuid } from 'uuid';

import { UserModel } from '../database/users/users.model';
import { User } from '../interfaces/User';
import { connect, disconnect } from '../mongo';

(async () => {
  connect();
  const users: User[] = [
    {
      firstName: 'Emma',
      lastName: 'Bradley',
      createdDate: new Date(),
      fullName: 'Emma Bradley',
      todos: [],
      id: uuid(),
    },
  ];
  try {
    users.forEach(async (user) => {
      await UserModel.create(user);
      console.log('User created');
    });
    setTimeout(() => {
      disconnect();
    }, 2000);
  } catch (e) {
    console.error(e);
  }
})();
