import {Result} from './models/Result';
import { parseData, generateModel, resolveModelTransform, resolveDomStructureForModel } from './preprocessor';

async function main() {
    console.info(process.argv);
    // Giving the location of the config to the pre processor
    const config = parseData(process.argv[2]);
    const models = config ? generateModel(config.sources) : [];

    models.length && resolveModelTransform(models);
    for (const model of models) {
        try {
            await resolveDomStructureForModel(model).catch((err: any) => {

            });
            model.Transform.transform().then((res: Result) => {
                console.log(res.Values);
            }).catch((error: any) => {}); 
        } catch(e) {
            console.log('oopse');
        }
    }
}
main();

