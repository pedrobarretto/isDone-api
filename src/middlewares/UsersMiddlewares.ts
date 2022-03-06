import { Request, Response, NextFunction } from 'express';

import { todosApp } from '../apps/todos/TodosApp';
import { comparePassword } from '../database/users/users.methods';

export function VerifyIfUserAlreadyExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, firstName, lastName, fullName, password } = req.body;

  todosApp.findByEmail(email).then((user) => {
    if (!firstName)
      return res
        .status(400)
        .send({ message: 'must-provide-name', statusCode: 400 });

    if (!lastName)
      return res
        .status(400)
        .send({ message: 'must-provide-lastname', statusCode: 400 });

    if (!fullName)
      return res
        .status(400)
        .send({ message: 'must-provide-fullname', statusCode: 400 });

    if (!email)
      return res
        .status(400)
        .send({ message: 'must-provide-email', statusCode: 400 });

    if (!password)
      return res
        .status(400)
        .send({ message: 'must-provide-password', statusCode: 400 });

    if (user?.email === email)
      return res
        .status(400)
        .send({ message: 'user-already-exists', statusCode: 400 });

    return next();
  });
}

export function VerifyUserLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  if (!email)
    return res
      .status(400)
      .send({ message: 'must-provide-email', statusCode: 400 });

  if (!password)
    return res
      .status(400)
      .send({ message: 'must-provide-password', statusCode: 400 });

  todosApp.findByEmail(email).then(async (user) => {
    if (!user)
      return res.status(400).send({ message: 'not-found', statusCode: 400 });

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch)
      return res
        .status(200)
        .send({ message: 'incorrect-password', statusCode: 400 });

    return next();
  });
}
