import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import { todosApp } from '../apps/todos/TodosApp';
import {
  gerenateTokenPayload,
  handleGenerateToken,
} from '../database/users/users.methods';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { VerifyIfUsersExists } from '../middlewares/TodosMiddlewares';
import {
  VerifyIfUserAlreadyExists,
  VerifyUserLogin,
} from '../middlewares/UsersMiddlewares';

const userRoutes = Router();

userRoutes.post(
  '/',
  [check('email', 'must-provide-valid-email').isEmail()],
  VerifyIfUserAlreadyExists,
  (req: Request, res: Response) => {
    todosApp.create(req);
    return res.sendStatus(201);
  }
);

userRoutes.post('/login', VerifyUserLogin, (req: Request, res: Response) => {
  const { email } = req.body;
  todosApp.findByEmail(email).then((user) => {
    const payload = gerenateTokenPayload(user.id);
    const token = handleGenerateToken(payload);
    return res.status(200).json({ token });
  });
});

userRoutes.use(AuthMiddleware);

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

export { userRoutes };
