import { Base } from './base';
import { RentalDataValue, Result } from './../models/Result';

export class ADC extends Base {
    transform() {
        return new Promise<Result<RentalDataValue>>((resolve, reject) => {
            const result: Result<RentalDataValue> = new Result();
            try {
                const listWrapper: any = this.Dom?.getElementById('placardContainer');
                if (listWrapper) {
                    const list: any = listWrapper?.children[0];
                    for (const listing of list.children) {
                        const section: HTMLElement = listing?.children[0];
                        const addressWrapper: Element | null = section?.getElementsByClassName('property-address')?.item(0);
                        const titleWrapper: Element | null = section?.getElementsByClassName('property-title')?.item(0);
                        const urlWrapper: Element | null = section?.getElementsByClassName('property-link')?.item(0);

                        const priceSection: Element | null = section?.getElementsByClassName('property-wrapper')?.item(0);
                        const priceWrapper: Element | null | undefined = priceSection?.getElementsByClassName('price-range')?.item(0);
                        //console.log(priceWrapper[0].textContent);
                        const resValue = new RentalDataValue();
                        resValue.Url = (urlWrapper as HTMLLinkElement)?.href || '';
                        resValue.Name = `${addressWrapper?.textContent} ${titleWrapper?.textContent}` || '';

                        if (priceWrapper?.textContent) {
                            const text: string = priceWrapper.textContent;
                            const range:string[] = text.split('-')
                            resValue.Price = range.length ? parseInt(range[0].replace(',', '').replace('$', ''), 10) 
                            : parseInt(text.replace(',', '').replace('$', ''), 10);
                        }
                        result.Values.push(resValue);
                        resolve(result);
                    }
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
