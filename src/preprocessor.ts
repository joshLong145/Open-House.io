import { BaseTransformModel } from './models/base';
import { 
   Zillow,
} from './transformers/zillow';
import {ADC} from './transformers/apartmentsdotcom';
import { JSDOM, VirtualConsole } from 'jsdom';
import { injectable } from 'inversify';
import { IService } from './interfaces/IService';

@injectable()
export class PreProcessor implements IService {
    name: string;
    
    constructor() {
        this.name = 'Preprocess'
    }

    generateModel(data: any[]): BaseTransformModel[] { 
        const models: any[] = [];
        for (const entry of data) {
            const modelDef: BaseTransformModel 
                = new BaseTransformModel(
                    entry, 
                    entry.limit, 
                    entry.Cookie, 
                    entry.price_upper);
            models.push(modelDef);
        }
    
        return models;
    };

    parseData(configPath: string): any {
        try {
            const fs: any = require('fs');
            const stream: any = fs.readFileSync(__dirname + configPath, {encoding: 'utf8', flag: 'r'});
            console.log(stream);
    
            return JSON.parse(stream);
        } catch (e) {
            console.error("Error while loading configuration", e.message);
        }
    };

    resolveModelTransform(models: BaseTransformModel[]) {
        for (const model of models) {
            switch(model.Data.transformer) {
                case "zillow":
                    console.log("Resolving new transformer for model");
                    model.Transform = new Zillow();
                    break;
                
                case "ADC":
                    console.log('Resolving new transformer for model');
                    model.Transform = new ADC();
                    break;
            } 
        }
    }

    resolveDomStructureForModel(model: BaseTransformModel): Promise<BaseTransformModel> {
        return new Promise<BaseTransformModel>((resolve, reject) => {
            try {
                const fetch = require('node-fetch');
                const page: any = fetch(model.Data.url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0',
                        'Cookie': model.Cookie
                    }
                });
                page.then((resp: any) => {
                    return resp.text();
                }).then((text: string) => {
                    try {
                        const vc: VirtualConsole = new VirtualConsole();
                        const dom: JSDOM = new JSDOM(text, {
                            resources: "usable",
                            pretendToBeVisual: true,
                            virtualConsole: vc
                       });
                        console.info("Resolved dom model for: ", model.Data.url);
                        model.Transform.Dom = dom ? dom.window.document : undefined;
                        resolve(model);
                    } catch(e) 
                    {
                        reject(e);
                    }
                }).catch((err: any) => {
                    console.error(err);
                });
            } catch (e) {
                console.error("Error while resolving DOM for model", e.message);
                reject(e);
            } 
        });
    }
}
