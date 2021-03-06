import { Base } from './base';
import { Result, ResultValue } from './../models/Result';
export class Zillow extends Base {
    transform() {
        return new Promise<Result>((resolve, reject) => {
            const result: Result = new Result();
            try {
                const listWrapper: HTMLElement | null | undefined = this.Dom?.getElementById('wrapper');
                if (listWrapper) {
                    const list = listWrapper.getElementsByClassName('photo-cards_wow photo-cards_short')
                    // we assume here there is only element with this class combinatation in the parent.
                    var listLength: number = list[0].children.length || 0;
                    for(var i= 0; i < listLength; i++) {
                        const outerWrapper: HTMLCollectionOf<Element> = list[0].children[i].getElementsByClassName('list-card');
                        // console.log(outerWrapper)
                        if(outerWrapper.length) {
                            const div = outerWrapper[0].getElementsByClassName('list-card-info');
                            const aTagWrapper = div[0].children[0]
                            const name = aTagWrapper.children[0].textContent;
                            if (div.length) { 
                                const priceWrapper = div[0].getElementsByClassName('list-card-price');
                                var price = priceWrapper[0].textContent || '';
                                price = this.prasePrice(price);
                                const resValue = new ResultValue();
                                resValue.Url = (aTagWrapper as any).href; // force type cast because i dont know why this is not a property on the type decleration.
                                resValue.Name = name || '';
                                resValue.Price = parseInt(price.replace('$', '').replace(',', ''), 10) || 0;
                                result.Values.push(resValue);
                            }
                        }
                    }
                }

                result.Status = 200;
                resolve(result);
            } catch(e) {
                result.Status = 500;
                console.error(e);
                resolve(result);
            }
        });
    }

    prasePrice(price: string): string { 
        const result: any = price.match(/(\$[0-9,]+(\.[0-9]{2})?)/);
        return result[0];
    }

    public constructor() {
        super();
    }
}
