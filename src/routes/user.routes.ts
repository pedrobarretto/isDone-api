import { Router, Request, Response } from 'express';

import { todosApp } from '../apps/todos/TodosApp';

const userRoutes = Router();

userRoutes.get('/', (req: Request, res: Response) => {
  todosApp.list().then((users) => {
    console.log(users);
    return res.status(200).json(users);
  });
});

userRoutes.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  todosApp.findById(id).then((user) => {
    console.log(user);
    return res.status(200).json(user);
  });
});

userRoutes.post('/', (req: Request, res: Response) => {
  todosApp.create(req).then((user) => {
    console.log(user);
    return res.status(201).json(user);
  });
});

export { userRoutes };
