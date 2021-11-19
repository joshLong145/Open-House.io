import { injectable } from "inversify";
import { Logger } from "winston";
import { GenerateConsoleLogger } from "./LoggingFactory";


@injectable()
export class ConsoleLoggerWrapper {
    public Log: Logger;

    constructor() {
        this.Log = GenerateConsoleLogger("root");
    }
}