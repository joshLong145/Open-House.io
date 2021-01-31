import { Router } from "express";



export abstract class BaseRoute {
    protected _router: Router;

    constructor(router: Router) {
        this._router = router;
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