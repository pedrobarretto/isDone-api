import { Request, Response, NextFunction } from 'express';

import { todosApp } from '../apps/todos/TodosApp';
import { getUserId } from '../database/users/users.methods';

export function VerifyIfUsersExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = getUserId(req);

  if (!id)
    return res
      .status(400)
      .send({ status: 400, message: 'must-provide-user-id' });

  todosApp.findById(id).then((user) => {
    if (!user)
      return res.status(400).send({ status: 400, message: 'not-found' });

    return next();
  });
}

export function VerifyIfTodoExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const { todoId } = req.body;

  if (!id)
    return res
      .status(400)
      .send({ status: 400, message: 'must-provide-user-id' });

  todosApp.findById(id).then((user) => {
    if (!user)
      return res.status(400).send({ status: 400, message: 'user-not-found' });

    const { todos } = user;

    const todoNotFound = todos.find((x) => x.id !== todoId);

    if (todoNotFound)
      return res.status(400).send({ status: 400, message: 'todo-not-found' });

    return next();
  });
}
