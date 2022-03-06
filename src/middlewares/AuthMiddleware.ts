import { Request, Response, NextFunction } from 'express';

import { verifyToken } from '../database/users/users.methods';

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header('Authorization');

  if (!token)
    return res.status(403).send({ status: 403, message: 'Forbidden Resourse' });

  try {
    verifyToken(token);
    return next();
  } catch (e) {
    return res.status(500).send({ status: 500, message: 'Invalid Token' });
  }
}
