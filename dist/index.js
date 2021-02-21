"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var parsing_1 = require("./routes/parsing");
var statsRoute_1 = require("./routes/statsRoute");
var db_1 = require("./db");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
var persistanceManager = new db_1.PersistanceManager();
persistanceManager.connect().then(function () {
    console.info('Instantiating transformation objects....');
    var parseingRoutes = new parsing_1.ParsingRoutes(express_1.default.Router(), persistanceManager.DB);
    var statsRoutes = new statsRoute_1.StatsRoutes(express_1.default.Router(), persistanceManager.DB);
    console.info('Done initializing transform objects');
    console.info('Configuring routes ....');
    statsRoutes.configureRoutes();
    parseingRoutes.configureRoutes();
    app.use(process.env.BASE_API_ROUTE || '/api', parseingRoutes.Router);
    app.use(process.env.BASE_API_ROUTE || '/api', statsRoutes.Router);
    app.listen(process.env.API_PORT);
    console.log('api listening on', process.env.API_PORT);
});
