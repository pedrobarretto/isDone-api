export interface UserToken {
  token: string;
}

interface UserTokenPayload {
  id: string;
}

export interface TokenPayload {
  user: UserTokenPayload;
}
