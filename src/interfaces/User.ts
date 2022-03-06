import { Todo } from './Todo';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  createdDate: Date;
  todos: Todo[];
}

export type ClientUser = Omit<User, 'password'>;
