import { Response } from 'express';

export function BadRequestException(res: Response, err: string) {
  return res.status(400).send({ status: 400, message: err });
}
