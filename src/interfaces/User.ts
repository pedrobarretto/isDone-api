import { Todo } from './Todo';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  createdDate: Date;
  todos: Todo[];
}
