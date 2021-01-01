import { Base } from './base';
export class Zillow extends Base {

    transform() {
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
                                console.log(name, price, aTagWrapper.href);
                            }
                        }
                    }
                }
            }
        } catch(e) {
            console.error(e)
        }
    }

    public constructor() {
        super();
    }
}
