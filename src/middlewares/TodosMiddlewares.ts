import { Request, Response, NextFunction } from 'express';

import { todosApp } from '../apps/todos/TodosApp';

export function VerifyIfTodoExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const { userId } = req.body;
  // fix me
  // just need userId, to check if user exists
  if (!userId)
    return res
      .status(400)
      .send({ status: 400, message: 'must-provide-user-id' });

  todosApp.findById(userId).then((user) => {
    const { todos } = user;
    const todoNotFound = todos.filter((x) => x.id === id);

    return next();
  });
}
