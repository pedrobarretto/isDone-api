import { Response } from 'express';

export function BadRequestException(res: Response, err: string) {
  return res.status(400).send({ statusCode: 400, message: err });
}
