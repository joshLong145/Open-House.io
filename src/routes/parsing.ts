import {Result} from '../models/Result';
import { parseData, generateModel, resolveModelTransform, resolveDomStructureForModel } from '../preprocessor';
import express from 'express';

const router = express.Router();

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.post('/parse', async (req, res) => {
    console.info(req.body);
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
});

export default router;