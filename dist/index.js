"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
var parsing_1 = require("./routes/parsing");
var parseingRoutes = new parsing_1.ParsingRoutes(express_1.default.Router());
parseingRoutes.configureRoutes();
app.use('/api', parseingRoutes.Router);
app.listen(5000);
console.log('api listening on 5000');
