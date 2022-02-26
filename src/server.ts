import bodyParser from 'body-parser';
import express from 'express';

import { connect } from './mongo';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(router);

connect();

app.listen(8080);
