import { parseData, generateModel, resolveModelTransform, resolveDomStructureForModel } from './preprocessor';

async function main() {
    console.info(process.argv);
    // Giving the location of the config to the pre processor
    const config = parseData(process.argv[2]);
    const models = config ? generateModel(config.sources) : [];

    models.length && resolveModelTransform(models);
    for (const model of models) {
        await resolveDomStructureForModel(model).catch((error: any) => {
            console.error(error);
        });
        model.Transform.transform(); 
    }    
}
main();

