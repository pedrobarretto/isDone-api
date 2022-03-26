/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import { todosApp } from '../apps/todos/TodosApp';
import {
  gerenateTokenPayload,
  getUserId,
  handleGenerateToken,
} from '../database/users/users.methods';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { VerifyIfUsersExists } from '../middlewares/TodosMiddlewares';
import {
  VerifyIfUserAlreadyExists,
  VerifyParamsId,
  VerifyUserLogin,
} from '../middlewares/UsersMiddlewares';

const userRoutes = Router();

userRoutes.post(
  '/register',
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

    if (!req.session.userId) {
      req.session.isAuth = true;
      req.session.userId = user.id;
    }
    return res.status(200).json({ token });
  });
});

userRoutes.use(AuthMiddleware);

userRoutes.get('/all', (req: Request, res: Response) => {
  todosApp.list().then((users) => {
    return res.status(200).json(users);
  });
});

userRoutes.get('/', VerifyIfUsersExists, (req: Request, res: Response) => {
  getUserId(req).then((userId) => {
    todosApp.findById(userId).then((user) => {
      return res.status(200).json(user);
    });
  });
});

userRoutes.delete(
  '/delete/:id',
  VerifyParamsId,
  (req: Request, res: Response) => {
    const { id } = req.params;
    todosApp.delete(id).then(() => {
      return res.status(204).send();
    });
  }
);

export { userRoutes };
