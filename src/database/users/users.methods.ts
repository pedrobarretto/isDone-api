import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { TokenPayload } from '../../interfaces/Auth';

export async function handlePasswordHash(password: string) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}

export function handleGenerateToken(payload: TokenPayload) {
  return jwt.sign(payload, 'randomString', { expiresIn: 3600 });
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
  return jwt.verify(token, 'randomString');
}
