import { Router } from "express"
import { injectable } from "inversify";
import { PersistanceManager } from "../db";


@injectable()
export abstract class BaseRoute {
    protected _router!: Router;
    protected _pm: PersistanceManager | undefined;
    constructor(pm: PersistanceManager | undefined) {
        this._pm = pm;
    }

    get Router(): Router {
        return this._router;
    }

    timeLog (req: any, res: any, next: any) {
        console.log('Time: ', Date.now());
        next();
    }

    abstract configureRoutes(): void;
    abstract initializeRouter(router: Router): void;
}