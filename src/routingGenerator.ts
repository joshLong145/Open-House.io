import { Router } from "express"
import { Db } from "mongodb";
import { BaseRoute } from "./routes/baseRoute";

export function addRoute<T extends BaseRoute>(router: Router, db: Db) {
    
}