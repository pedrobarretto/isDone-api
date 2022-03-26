import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';

import { connect } from './mongo';
import { router } from './routes';

const app = express();

const store = new session.MemoryStore();

declare module 'express-session' {
  interface SessionData {
    isAuth: boolean;
    userId: string;
  }
}

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.ENVIRONMENT === 'production',
      // sameSite: true,
    },
  })
);

app.use(express.json());

app.use(cors({ credentials: true, origin: process.env.BASE_URL }));

app.use(bodyParser.json());
app.use(router);

connect();

app.listen(process.env.PORT || 3333, () =>
  console.log(`Running on port ${process.env.PORT || '3333'}`)
);
