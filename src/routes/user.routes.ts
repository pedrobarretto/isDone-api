/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
import { check } from 'express-validator';
import { v4 as uuid } from 'uuid';

import { todosApp } from '../apps/todos/TodosApp';
import { SessionModel } from '../database/sessions/sessions.model';
import {
  gerenateTokenPayload,
  getUserId,
  handleGenerateToken,
} from '../database/users/users.methods';
import { Session } from '../interfaces/Auth';
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

    const { session }: any = req;
    if (!session.userId) {
      session.userId = user.id;
      const newSession: Session = {
        userId: user.id,
        id: uuid(),
        _expires: req.session.cookie.expires,
        httpOnly: req.session.cookie.httpOnly,
        originalMaxAge: req.session.cookie.originalMaxAge,
        path: req.session.cookie.path,
      };
      console.log(newSession);
      console.log('session ', session);
      SessionModel.create(newSession);
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
  const id = getUserId(req);
  todosApp.findById(id).then((user) => {
    return res.status(200).json(user);
  });
});

userRoutes.post('/logout', (req: Request, res: Response) => {
  const { session }: any = req;
  console.log(session);

  if (!session.userId)
    return res
      .status(400)
      .json({ status: 400, message: 'session-does-not-exists' });

  SessionModel.deleteOne({ userId: session.userId }).then((x) =>
    console.log(x)
  );
  req.session.destroy((err) => console.log(err));
  return res.status(200).json({ status: 200, message: 'session-deleted' });
});

export { userRoutes };
