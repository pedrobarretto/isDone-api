import { Request, Response, NextFunction } from 'express';

import { todosApp } from '../apps/todos/TodosApp';
import { comparePassword } from '../database/users/users.methods';

export function VerifyIfUserAlreadyExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, firstName, lastName, fullName, password } = req.body;

  todosApp.findByEmailIntern(email).then((user) => {
    if (!firstName)
      return res
        .status(400)
        .send({ message: 'must-provide-name', status: 400 });

    if (!lastName)
      return res
        .status(400)
        .send({ message: 'must-provide-lastname', status: 400 });

    if (!fullName)
      return res
        .status(400)
        .send({ message: 'must-provide-fullname', status: 400 });

    if (!email)
      return res
        .status(400)
        .send({ message: 'must-provide-email', status: 400 });

    if (!password)
      return res
        .status(400)
        .send({ message: 'must-provide-password', status: 400 });

    if (user?.email === email)
      return res
        .status(400)
        .send({ message: 'user-already-exists', status: 400 });

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
    return res.status(404).send({ message: 'must-provide-email', status: 404 });

  if (!password)
    return res
      .status(404)
      .send({ message: 'must-provide-password', status: 404 });

  todosApp.findByEmailIntern(email).then(async (user) => {
    if (!user)
      return res.status(404).send({ message: 'not-found', status: 404 });

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch)
      return res
        .status(404)
        .send({ message: 'incorrect-password', status: 404 });

    return next();
  });
}

export function VerifyParamsId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  if (!id)
    return res.status(404).send({ status: 404, message: 'must-provide-id' });

  todosApp.findById(id).then((user) => {
    console.debug(`User found: ${JSON.stringify(user)}`);
    console.debug(`!user >> ${!user}`);
    if (!user) {
      console.debug('User not found');
      return res.status(404).send({ status: 404, message: 'user-not-found' });
    }
    console.debug('User found');
    return next();
  });
  console.debug('next');
  return next();
}
