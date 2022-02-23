import { Request, Response, NextFunction } from 'express';

import { todosApp } from '../apps/todos/TodosApp';

export function VerifyIfUserAlreadyExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, firstName, lastName, fullName } = req.body;

  todosApp.findByEmail(email).then((userAlreadyExists) => {
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

    if (userAlreadyExists.email === email)
      return res
        .status(400)
        .send({ message: 'user-already-exists', statusCode: 400 });

    return next();
  });
}
