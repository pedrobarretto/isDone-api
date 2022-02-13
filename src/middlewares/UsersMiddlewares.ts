import { Request, Response, NextFunction } from 'express';

import { todosApp } from '../apps/todos/TodosApp';
import { findByEmail } from '../database/users/users.methods';
import { BadRequestException } from '../errors/BadRequestException';

export function VerifyIfUserAlreadyExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, firstName, lastName, fullName } = req.body;

  findByEmail(email).then((userAlreadyExists) => {
    if (!firstName) BadRequestException(res, 'must-provide-firstName');

    if (!lastName) BadRequestException(res, 'must-provide-lastName');

    if (!fullName) BadRequestException(res, 'must-provide-fullName');

    if (userAlreadyExists) BadRequestException(res, 'user-already-exists');
  });
  console.log('PASSANDO DAS VALIDACOES');
  return next();
}

export function VerifyIfIdExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  todosApp.findById(id).then((user) => {
    console.log('id: ', id);
    console.log('user: ', user);

    if (!user || user === null) return BadRequestException(res, 'not-found');

    return next();
  });

  return next();
}
