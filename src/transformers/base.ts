import { JSDOM } from "jsdom";
import { ConsoleLoggerWrapper } from "../logging/ConsoleLoggerWrapper";
import {RentalDataValue, Result} from "../models/Result";

export abstract class Base {
    private _logger: ConsoleLoggerWrapper;
    private _dom: Document | undefined;
    get Dom() { return this._dom; }
    set Dom(value: Document | undefined) { this._dom = value; }

    abstract transform(): Promise<Result<RentalDataValue>>; 

    public constructor(logger: ConsoleLoggerWrapper) {
        this._logger = logger;
    }
};
