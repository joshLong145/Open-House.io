import {Collection, Db} from 'mongodb';
import {Result} from '../models/Result';
import { generateModel, 
         resolveModelTransform, 
         resolveDomStructureForModel 
        } from '../preprocessor';
import { Router } from 'express';
import { BaseRoute } from './baseRoute';

export class ParsingRoutes extends BaseRoute {

    constructor(router: Router, db: Db | undefined) {
        super(router, db);
    }

    configureRoutes(): void {
        this._router.use(this.timeLog);
        this._router.post('/parse', this.parseFunctionEndpoint.bind(this));
    }

    private async parseFunctionEndpoint(req: any, res: any) {
        const config: any = req.body;
        const models = config ? generateModel(config.sources) : [];
    
        models.length && resolveModelTransform(models);
        const results: Array<Result> = [];
        for (const model of models) {
            try {
                await resolveDomStructureForModel(model).catch((err: any) => {
                    console.error(err);
                });
                const res: Result =  await model.Transform.transform().catch((error: any) => {
                    console.error(error);
                });
                for (const data of res.Values) {
                    const collection: Collection | undefined = this._db?.collection(process.env.COLLECTION_NAME as string);
                     collection?.find({'Name': data.Name}).toArray().then(docs => {
                        docs.length < 1 && collection.insertOne(data);
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