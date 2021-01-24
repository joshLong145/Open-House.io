import { Base } from './base';
import { Result, ResultValue } from './../models/Result';
export class Zillow extends Base {
    transform() {
        return new Promise<Result>((resolve, reject) => {
            const result: Result = new Result();
            try {
                var length: number = this.Dom?.children?.length || 0;
               for(var i = 0; i < length; i++) {
                    if (this.Dom?.children[i].id == 'wrapper') {
                        const list = this.Dom.children[i].getElementsByClassName('photo-cards_wow photo-cards_short')
                        // we assume here there is only element with this class combinatation in the parent.
                        var listLength: number = list[0].children.length || 0;
                        for(var j= 0; j < listLength; j++) {
                            const outerWrapper = list[0].children[i].getElementsByClassName('list-card')
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
                                    resValue.Price = price || '';
                                    result.Values.push(resValue);
                                    //console.log(name, price, aTagWrapper.href);
                                }
                            }
                        }

                        result.Status = 200;
                        resolve(result);
                    }
                }
            } catch(e) {
                result.Status = 500;
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
