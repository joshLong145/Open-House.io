import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import { ParsingRoutes }from './routes/parsing';

const parseingRoutes: ParsingRoutes =  new ParsingRoutes(express.Router());
parseingRoutes.configureRoutes();

app.use('/api', parseingRoutes.Router);

app.listen(process.env.API_PORT);
console.log('api listening on', process.env.API_PORT);