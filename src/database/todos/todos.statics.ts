import { v4 as uuid } from 'uuid';

import { Todo } from '../../interfaces/Todo';
import { UserModel } from '../users/users.model';
import { generateNewTodosLst } from './todos.methods';

export async function listTodos(id: string): Promise<Todo[]> {
  const res = await UserModel.find({ id });
  const [user] = res;
  return user.todos;
}

export async function createTodo(id: string, text: string): Promise<Todo[]> {
  const res = await UserModel.find({ id });
  const [user] = res;

  const newTodo: Todo = {
    id: uuid(),
    createdDate: new Date(),
    text,
    isDone: false,
  };
  const newTodosLst = [...user.todos, newTodo];

  await UserModel.updateOne(
    { id },
    {
      $set: {
        todos: newTodosLst,
      },
    }
  );

  return [newTodo];
}

export async function markTodoAsDone(
  id: string,
  todoId: string
): Promise<void> {
  const res = await UserModel.find({ id });
  const [user] = res;
  const { todos } = user;

  const newTodosLst = generateNewTodosLst(todos, todoId);

  await UserModel.updateOne(
    { id },
    {
      $set: {
        todos: newTodosLst,
      },
    }
  );
}
