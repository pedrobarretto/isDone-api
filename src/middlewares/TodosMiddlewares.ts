import { Request, Response, NextFunction } from 'express';

import { todosApp } from '../apps/todos/TodosApp';

export function VerifyIfUsersExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.session;

  if (!userId)
    return res
      .status(400)
      .json({ status: 400, message: 'must-provide-user-id' });

  return next();
}

export function VerifyIfTodoExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { todoId } = req.params;
  const { userId } = req.session;

  if (!userId)
    return res
      .status(400)
      .send({ status: 400, message: 'must-provide-user-id' });

  todosApp.findById(userId).then((user) => {
    if (!user)
      return res.status(400).send({ status: 400, message: 'user-not-found' });

    const { todos } = user;

    const todoNotFound = todos.find((x) => x.id === todoId);

    if (!todoNotFound)
      return res.status(400).send({ status: 400, message: 'todo-not-found' });

    return next();
  });
}
