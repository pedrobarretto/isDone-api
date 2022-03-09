export interface UserToken {
  token: string;
}

interface UserTokenPayload {
  id: string;
}

export interface TokenPayload {
  user: UserTokenPayload;
}

export interface Session {
  id: string;
  userId: string;
  path: string;
  _expires: Date;
  originalMaxAge: number;
  httpOnly: boolean;
  email: string;
  sessionId: string;
}
