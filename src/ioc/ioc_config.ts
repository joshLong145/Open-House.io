import "reflect-metadata";
import { Container } from "inversify";

import { ParsingRoutes }from './../routes/parsing';
import { StatsRoutes } from './../routes/statsRoute'
import {PersistanceManager} from '../services/db';
import { IConnect } from '../interfaces/IConnect';
import SERVICE_IDENTIFIERS from '../identities/identities';
import { BaseRoute } from '../routes/baseRoute';
import { PreProcessor } from '../services/preprocessor';
import { IService } from '../interfaces/IService';
import { makeLoggerMiddleware } from "inversify-logger-middleware";

const container: Container = new Container();
let logger = makeLoggerMiddleware();
container.applyMiddleware(logger);

container.bind<IConnect>(SERVICE_IDENTIFIERS.DATABASE).to(PersistanceManager);
container.bind<IService>(SERVICE_IDENTIFIERS.PREPROCESSOR).to(PreProcessor);

container.bind<BaseRoute>(SERVICE_IDENTIFIERS.ROUTES).to(ParsingRoutes).whenTargetNamed('parsing');
container.bind<BaseRoute>(SERVICE_IDENTIFIERS.ROUTES).to(StatsRoutes).whenTargetNamed('stats');

export default container;