import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { connect } from './mongo';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(router);

connect();

app.listen(process.env.PORT || 3333);
