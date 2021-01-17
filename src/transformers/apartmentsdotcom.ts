import { Base } from './base';
import { Result, ResultValue } from './../models/Result';

export class ADC extends Base {
    transform() {
        return new Promise<Result>((resolve, reject) => {
            const result: Result = new Result();
            try {
                const listWrapper: any = this.Dom.getElementById('placardContainer');
                if (listWrapper) {
                    const list: any = listWrapper.children[0];
                    for (const listing of list.children) {
                        const section: HTMLElement = listing.children[0];
                        const addressWrapper: any = section.children[0].children[0].children[0];
                        if(addressWrapper) {
                           const address = addressWrapper.children[1];
                            console.log(address.textContent, addressWrapper.href);
                        }
                    }
                }
           } catch(e) {
                console.log(e);
            }
        });
    }
}
