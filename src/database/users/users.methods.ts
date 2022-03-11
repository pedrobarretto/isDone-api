import bcrypt from 'bcryptjs';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { sessionApp } from '../../apps/sessions/SessionsApp';
import { TokenPayload } from '../../interfaces/Auth';
import { ClientUser, User } from '../../interfaces/User';

const secretKey = process.env.SECRET_KEY;

export async function handlePasswordHash(password: string) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}

export function handleGenerateToken(payload: TokenPayload) {
  return jwt.sign(payload, secretKey, { expiresIn: 3600 });
}

export function gerenateTokenPayload(id: string): TokenPayload {
  const payload: TokenPayload = {
    user: {
      id,
    },
  };
  return payload;
}

export function comparePassword(password: string, userPassword: string) {
  return bcrypt.compare(password, userPassword);
}

export function verifyToken(token: string) {
  return jwt.verify(token, secretKey);
}

export function hidePassword(user: User): ClientUser {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    email: user.email,
    todos: user.todos,
    createdDate: user.createdDate,
    id: user.id,
  };
}

export async function getUserId(req: Request) {
  return req.session.userId;
}
