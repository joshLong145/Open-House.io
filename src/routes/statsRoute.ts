import { Router } from "express";
import { AggregationCursor, Collection, Db, EndCallback, IteratorCallback } from "mongodb";
import { BaseRoute } from "./baseRoute";

export class StatsRoutes extends BaseRoute {
    configureRoutes(): void {
        this._router.use(this.timeLog);
        this._router.get('/stats/avg/price', this.getAverageListingPrice.bind(this));
    }

    constructor(router: Router, db: Db | undefined) {
        super(router, db);
    }

    getAverageListingPrice(req: any, res: any) {
        const collection: Collection | undefined = this._db?.collection(process.env.COLLECTION_NAME as string);
        const cursor: AggregationCursor| undefined = 
            collection?.aggregate([
                {
                $sort: {_name: 1}
                },
                {
                $group: {
                    _id:null,
                    avg: { $avg:"$_price" },
                    count: {$sum: 1}
                }
            }]);
        cursor?.toArray().then(item => {
            console.log(item);
            res.status(200);
            res.send(item);
        });
        
    }
}
