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
import { GenerateConsoleLogger } from "../logging/LoggingFactory";
import { Logger } from "winston";
import { ConsoleLoggerWrapper } from "../logging/ConsoleLoggerWrapper";

const logger = GenerateConsoleLogger("ioc");
const container: Container = new Container();
let loggingMidleware = makeLoggerMiddleware();
logger.info("starting container creation with the following services");
logger.info(SERVICE_IDENTIFIERS);

container.applyMiddleware(loggingMidleware);
container.bind<ConsoleLoggerWrapper>(SERVICE_IDENTIFIERS.LOGGER).to(ConsoleLoggerWrapper).inSingletonScope();
container.bind<IConnect>(SERVICE_IDENTIFIERS.DATABASE).to(PersistanceManager).inSingletonScope();
container.bind<IService>(SERVICE_IDENTIFIERS.PREPROCESSOR).to(PreProcessor).inSingletonScope();

container.bind<BaseRoute>(SERVICE_IDENTIFIERS.ROUTES).to(ParsingRoutes).whenTargetNamed('parsing');
container.bind<BaseRoute>(SERVICE_IDENTIFIERS.ROUTES).to(StatsRoutes).whenTargetNamed('stats');

export default container;