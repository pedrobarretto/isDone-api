import { Router, Request, Response } from 'express';

import { todosApp } from '../apps/todos/TodosApp';
import { VerifyIfUsersExists } from '../middlewares/TodosMiddlewares';
import { VerifyIfUserAlreadyExists } from '../middlewares/UsersMiddlewares';

const userRoutes = Router();

userRoutes.get('/', (req: Request, res: Response) => {
  todosApp.list().then((users) => {
    return res.status(200).json(users);
  });
});

userRoutes.get('/:id', VerifyIfUsersExists, (req: Request, res: Response) => {
  const { id } = req.params;
  todosApp.findById(id).then((user) => {
    return res.status(200).json(user);
  });
});

userRoutes.post(
  '/',
  VerifyIfUserAlreadyExists,
  (req: Request, res: Response) => {
    todosApp.create(req).then((user) => {
      return res.status(201).json(user);
    });
  }
);

export { userRoutes };
