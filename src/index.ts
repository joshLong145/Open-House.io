import express from 'express';
import bodyParser from 'body-parser';
import { ParsingRoutes }from './routes/parsing';
import {PersistanceManager} from './db';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const persistanceManager: PersistanceManager = new PersistanceManager();
persistanceManager.connect();

console.info('Instantiating transformation objects....');
const parseingRoutes: ParsingRoutes =  new ParsingRoutes(express.Router());
console.info('Done initializing transform objects');

console.info('Configuring routes ....');
parseingRoutes.configureRoutes();


app.use(process.env.BASE_API_ROUTE || '/api', parseingRoutes.Router);

app.listen(process.env.API_PORT);
console.log('api listening on', process.env.API_PORT);