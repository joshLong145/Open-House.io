import {Collection, Db} from 'mongodb';
import { RentalDataValue, Result } from '../models/Result';
import { Router } from 'express';
import { BaseRoute } from './baseRoute';
import { inject, injectable } from 'inversify';
import SERVICE_IDENTIFIERS from '../identities/identities';
import { PreProcessor } from '../services/preprocessor';
import { PersistanceManager } from '../services/db';
import { ConsoleLoggerWrapper } from '../logging/ConsoleLoggerWrapper';
import { loggers } from 'winston';

@injectable()
export class ParsingRoutes extends BaseRoute {

    private _preprocess: PreProcessor;
    private _logger: ConsoleLoggerWrapper;
    constructor(@inject(SERVICE_IDENTIFIERS.PREPROCESSOR) prepros: PreProcessor, 
                @inject(SERVICE_IDENTIFIERS.DATABASE) pm: PersistanceManager,
                @inject(SERVICE_IDENTIFIERS.LOGGER) logger: ConsoleLoggerWrapper) {
        super(pm);

        this._preprocess = prepros;
        this._logger = logger;
    }
    
    initializeRouter(router: Router): void {
        this._router = router;
    }

    configureRoutes(): void {
        this._router.use(this.timeLog);
        this._router.post('/parse', this.parseFunctionEndpoint.bind(this));
    }

    private async parseFunctionEndpoint(req: any, res: any) {
        const config: any = req.body;
        const models = config ? this._preprocess.generateModel(config.sources) : [];
    
        models.length && this._preprocess.resolveModelTransform(models);
        const results: Array<Result<RentalDataValue>> = [];
        const collection: Collection | undefined = this._pm?.DB?.collection(process.env.COLLECTION_NAME as string);
        const resolverWrapper = (model: any) => {
            return new Promise<Result<RentalDataValue>>((resolve, reject) => {
                try {
                    this._preprocess.resolveDomStructureForModel(model).then(() => {
                        model.Transform.transform().then((transformResult: Result<RentalDataValue>) => {
                            
                            this._pm?.storeAsync(collection, transformResult.Values);
                            resolve(transformResult);
                        });
                    }).catch((error: any) => {
                        console.error(error);
                        resolve(new Result());
                    }).catch((err: any) => {
                        console.error(err);
                        resolve(new Result());
                    });
                } catch(e) {
                    resolve(new Result());
                }
            });
        };
        const resPromises: Promise<Result<RentalDataValue>>[] = [];

        for (const model of models) {
            resPromises.push(resolverWrapper(model));

        }

        Promise.all(resPromises).then((results: Result<RentalDataValue>[]) => {
            this._logger.Log.info("Done transforming models transformation results");
            this._logger.Log.info("----- -----");
            this._logger.Log.info(results.toString());
            res.status(200).send(results);
        }).catch((reson: any) => {
            console.error(reson);
        });
    }
    
}