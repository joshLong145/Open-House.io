import { Router } from "express";
import { Db } from "mongodb";



export abstract class BaseRoute {
    protected _router: Router;
    protected _db: Db | undefined;
    constructor(router: Router, db: Db | undefined) {
        this._router = router;
        this._db = db;
    }

    get Router(): Router {
        return this._router;
    }

    timeLog (req: any, res: any, next: any) {
        console.log('Time: ', Date.now());
        next();
    }

    abstract configureRoutes(): void;
}