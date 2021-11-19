// @ts-nocheck

import { BaseTransformModel } from '../models/base';
import { 
   Zillow,
} from '../transformers/zillow';
import {ADC} from '../transformers/apartmentsdotcom';
import { JSDOM, VirtualConsole } from 'jsdom';
import { inject, injectable } from 'inversify';
import { IService } from '../interfaces/IService';
import fetch from 'node-fetch'; 
import { Logger } from 'winston';
import SERVICE_IDENTIFIERS from '../identities/identities';
import { ConsoleLoggerWrapper } from '../logging/ConsoleLoggerWrapper';

@injectable()
export class PreProcessor implements IService {
    name: string;
    logger: ConsoleLoggerWrapper;
    constructor(@inject(SERVICE_IDENTIFIERS.LOGGER) logger: ConsoleLoggerWrapper) {
        this.name = 'Preprocess'
        this.logger = logger;
    }

    generateModel(data: any[]): BaseTransformModel[] { 
        this.logger.Log.info("starting model generation");
        const models: any[] = [];

        for (const entry of data) {
            this.logger.Log.info("Resolving model of type for ", entry);
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
    
            return JSON.parse(stream as unknown as string);
        } catch (e) {
            console.error("Error while loading configuration", e.message);
        }
    };

    resolveModelTransform(models: BaseTransformModel[]) {
        for (const model of models) {
            this.logger.Log.info(`Resolving new transformer for model: ${model.Data.transformer}`);
            switch(model.Data.transformer) {
                case "zillow":
                    model.Transform = new Zillow();
                    break;
                
                case "ADC":
                    model.Transform = new ADC();
                    break;
            } 
        }
    }

    resolveDomStructureForModel(model: BaseTransformModel): Promise<BaseTransformModel> {
        return new Promise<BaseTransformModel>((resolve, reject) => {

            try {
                fetch(model.Data.url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0',
                        'Cookie': model.Cookie
                    }
                }).then((resp: any) => {
                    return resp.text();
                }).then((text: string) => {
                    try {
                        const vc: VirtualConsole = new VirtualConsole();
                        const dom: JSDOM = new JSDOM(text, {
                            resources: "usable",
                            pretendToBeVisual: true,
                            virtualConsole: vc
                       });
                       this.logger.Log.info(`Resolved dom model for: ${model.Data.uri}`);
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
                console.error("Error while resolving DOM for model");
                reject(e);
            } 
        });
    }
}
