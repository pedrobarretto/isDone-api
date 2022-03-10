import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';

import { connect, sessionStore } from './mongo';
import { router } from './routes';

const app = express();

const store = new session.MemoryStore();

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

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(router);

connect();

app.listen(process.env.PORT || 3333);
