import { Request } from 'express';

import { findBySessionId } from '../../database/sessions/sessions.static';

class SessionsApp {
  findBySessionId(req: Request) {
    const sessionId = req.sessionID;
    const session = findBySessionId(sessionId);
    return session;
  }
}

export const sessionApp = new SessionsApp();
