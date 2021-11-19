import { Router } from "express";
import { readdirSync } from "fs";
import { inject, injectable } from "inversify";
import { AggregationCursor, Collection, Db } from "mongodb";
import { PersistanceManager } from "../services/db";
import SERVICE_IDENTIFIERS from "../identities/identities";
import { BaseRoute } from "./baseRoute";


@injectable()
export class StatsRoutes extends BaseRoute {
    constructor( 
        @inject(SERVICE_IDENTIFIERS.DATABASE) pm: PersistanceManager) {
        super(pm);
    }
    configureRoutes(): void {
        this._router.use(this.timeLog);
        this._router.get('/stats/avg/price', this.getAverageListingPrice.bind(this));
    }

    initializeRouter(router: Router): void {
        this._router = router;
    }
    getAverageListingPrice(req: any, res: any) {
        try {
            const town: string = req.query['town'];
            const collection: Collection | undefined = 
                this._pm?.DB?.collection(process.env.COLLECTION_NAME as string);
            const cursor: AggregationCursor| undefined = 
                this._pm?.generateCursorForAveraging(collection as Collection, town);
            cursor?.toArray().then(item => {
                console.log(item);
                res.status(200);
                res.send(item);
            });
        } catch(e) {
            console.error(e);
            res.status(502);
            res.send(501);
        }
    }
}
