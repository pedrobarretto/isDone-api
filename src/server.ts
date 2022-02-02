import express from 'express';

import { ConnectToMongo } from './mongo';

const app = express();

app.get('/', (req, res) => {
  ConnectToMongo();
  return res.send(201);
});

app.listen(8080);
