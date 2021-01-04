import { Base } from './base';
import { Result, ResultValue } from './../models/Result';
export class Zillow extends Base {
    transform() {
        return new Promise<Result>((resolve, reject) => {
            const result: Result = new Result();
            try {
               for(const el of this.Dom.body.children) {
                    if (el.id == 'wrapper') {
                        const list = el.getElementsByClassName('photo-cards_wow photo-cards_short')
                        // we assume here there is only element with this class combinatation in the parent.
                        for(const listEl of list[0].children) {
                            const outerWrapper = listEl.getElementsByClassName('list-card')
                            // console.log(outerWrapper)
                            if(outerWrapper.length) {
                                const div = outerWrapper[0].getElementsByClassName('list-card-info');
                                const aTagWrapper = div[0].children[0]
                                const name = aTagWrapper.children[0].textContent;
                                if (div.length) { 
                                    const priceWrapper = div[0].getElementsByClassName('list-card-price');
                                    const price = priceWrapper[0].textContent;
                                    const resValue = new ResultValue();
                                    resValue.Url = aTagWrapper.href;
                                    resValue.Name = name;
                                    resValue.Price = price;
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

    public constructor() {
        super();
    }
}
