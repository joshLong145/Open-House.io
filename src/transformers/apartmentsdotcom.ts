import { Base } from './base';
import { RentalDataValue, Result } from './../models/Result';
import { ConsoleLoggerWrapper } from '../logging/ConsoleLoggerWrapper';

export class ADC extends Base {
    
    constructor(logger: ConsoleLoggerWrapper)
    {
        super(logger);
    }

    transform() {
        return new Promise<Result<RentalDataValue>>((resolve, reject) => {
            const result: Result<RentalDataValue> = new Result();
            try {
                const listWrapper: any = this.Dom?.getElementById('placardContainer');
                if (listWrapper) {
                    const list: HTMLElement = listWrapper?.children[0];
                    for (let i = 0; i < list.children.length; i++) {
                        const section: HTMLElement = list.children[i].children[0] as HTMLElement;
                        const addressWrapper: Element | null = section?.getElementsByClassName('property-address')?.item(0);
                        const titleWrapper: Element | null = section?.getElementsByClassName('property-title')?.item(0);
                        const urlWrapper: Element | null = section?.getElementsByClassName('property-link')?.item(0);
                        var priceQuery: HTMLCollection = list.children[i].getElementsByTagName("p");
                        var price: string = "";
                        this._logger.Log.debug(`Parsing child elemnt ${titleWrapper?.textContent} with address ${ addressWrapper?.textContent}`);
                        if (priceQuery !== null)
                            for (let p = 0; p < priceQuery.length; p++) {
                                const text = priceQuery[p] ? priceQuery[p].textContent : "";
                                if(text && text?.indexOf("$") > -1)
                                {
                                    price = text;
                                }
                            }
                        price = price.indexOf(" - ") > 0 ? price.split(" - ")[0] : price;
                        price = price.replace("$", "").replace(",", "");
                        const resValue = new RentalDataValue();
                        resValue.Url = (urlWrapper as HTMLLinkElement)?.href || '';
                        resValue.Name = `${addressWrapper?.textContent} ${titleWrapper?.textContent}` || '';
                        this._logger.Log.debug(`${titleWrapper?.textContent} price: ${price}`);
                        if (price) {
                            resValue.Price = parseInt(price, 10);
                        }
                        result.Values.push(resValue);
                    }
                    resolve(result);
                } else {
                    console.info('no list content ... ');
                    resolve(result);
                }
           } catch(e) {  
               console.error(e);
               resolve(result);
           }
        });
    }
}
