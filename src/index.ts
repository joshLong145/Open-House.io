import express from 'express';
import bodyParser from 'body-parser';


import container from './ioc/ioc_config';
import { BaseRoute } from './routes/baseRoute';
import SERVICE_IDENTIFIERS from './identities/identities';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const parsingRoute: BaseRoute 
    = container.getNamed(SERVICE_IDENTIFIERS.ROUTES,'parsing');
const averagingRouote: BaseRoute = 
    container.getNamed(SERVICE_IDENTIFIERS.ROUTES,'stats');

parsingRoute.initializeRouter(express.Router());
averagingRouote.initializeRouter(express.Router());

parsingRoute.configureRoutes();
averagingRouote.configureRoutes();


app.use(process.env.BASE_API_ROUTE || '/api', parsingRoute.Router);
app.use(process.env.BASE_API_ROUTE || '/api', averagingRouote.Router);

app.listen(process.env.API_PORT);
console.log('api listening on', process.env.API_PORT);
