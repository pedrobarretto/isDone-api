import { SessionModel } from './sessions.model';

export async function findBySessionId(sessionId: string) {
  const session = SessionModel.findOne({ sessionId });
  return session;
}
