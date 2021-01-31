import {Result} from '../models/Result';
import { generateModel, 
         resolveModelTransform, 
         resolveDomStructureForModel 
        } from '../preprocessor';
import { Router } from 'express';
import { BaseRoute } from './baseRoute';

export class ParsingRoutes extends BaseRoute {

    constructor(router: Router) {
        super(router);
    }

    configureRoutes(): void {
        this._router.use(this.timeLog);
        this._router.post('/parse', this.parseFunctionEndpoint);
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
                results.push(res);
            } catch(e) {
                console.log('oopse');
            }
        }
        res.status(200).send(results);
    }
    
}