import {Collection, Db} from 'mongodb';
import { Result } from '../models/Result';
import { Router } from 'express';
import { BaseRoute } from './baseRoute';
import { inject, injectable } from 'inversify';
import SERVICE_IDENTIFIERS from '../identities/identities';
import { PreProcessor } from '../preprocessor';
import { PersistanceManager } from '../db';

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
        for (const model of models) {
            try {
                await this._preprocess.resolveDomStructureForModel(model).catch((err: any) => {
                    console.error(err);
                });
                const res: Result =  await model.Transform.transform().catch((error: any) => {
                    console.error(error);
                });
                for (const data of res?.Values) {
                     collection?.find({'_name': data.Name}).toArray().then(docs => {
                        docs?.length < 1 && collection.insertOne(data);
                     });
                }
                results.push(res);
            } catch(e) {
                console.error(e);
            }
        }
        res.status(200).send(results);
    }
    
}