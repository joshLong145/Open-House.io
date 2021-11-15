import {Collection, Db} from 'mongodb';
import { Result } from '../models/Result';
import { Router } from 'express';
import { BaseRoute } from './baseRoute';
import { inject, injectable } from 'inversify';
import SERVICE_IDENTIFIERS from '../identities/identities';
import { PreProcessor } from '../services/preprocessor';
import { PersistanceManager } from '../services/db';

@injectable()
export class ParsingRoutes extends BaseRoute {

    private _preprocess: PreProcessor;
    constructor(@inject(SERVICE_IDENTIFIERS.PREPROCESSOR) prepros: PreProcessor, 
                @inject(SERVICE_IDENTIFIERS.DATABASE) pm: PersistanceManager) {
        super(pm);

        this._preprocess = prepros;
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
        const results: Array<Result> = [];
        const collection: Collection | undefined = this._pm?.DB?.collection(process.env.COLLECTION_NAME as string);
        const resolverWrapper = (model: any) => {
            return new Promise<Result>((resolve, reject) => {
                try {
                    this._preprocess.resolveDomStructureForModel(model).then(() => {
                        model.Transform.transform().then((transformResult: Result) => {
                            
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
        const resPromises: Promise<Result>[] = [];

        for (const model of models) {
            resPromises.push(resolverWrapper(model));
        }

        Promise.all(resPromises).then((results: Result[]) => {
            console.log("All transformers have resolved: ", results);
            res.status(200).send(results);
        }).catch((reson: any) => {
            console.error(reson);
        });
    }
    
}