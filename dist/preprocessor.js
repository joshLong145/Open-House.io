"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDomStructureForModel = exports.resolveModelTransform = exports.parseData = exports.generateModel = void 0;
var base_1 = require("./models/base");
var zillow_1 = require("./transformers/zillow");
var apartmentsdotcom_1 = require("./transformers/apartmentsdotcom");
var jsdom_1 = require("jsdom");
function generateModel(data) {
    var models = [];
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var entry = data_1[_i];
        var modelDef = new base_1.BaseTransformModel(entry, entry.limit, entry.Cookie, entry.price_upper);
        models.push(modelDef);
    }
    return models;
}
exports.generateModel = generateModel;
;
function parseData(configPath) {
    try {
        var fs = require('fs');
        var stream = fs.readFileSync(__dirname + configPath, { encoding: 'utf8', flag: 'r' });
        console.log(stream);
        return JSON.parse(stream);
    }
    catch (e) {
        console.error("Error while loading configuration", e.message);
    }
}
exports.parseData = parseData;
;
function resolveModelTransform(models) {
    for (var _i = 0, models_1 = models; _i < models_1.length; _i++) {
        var model = models_1[_i];
        switch (model.Data.transformer) {
            case "zillow":
                console.log("Resolving new transformer for model");
                model.Transform = new zillow_1.Zillow();
                break;
            case "ADC":
                console.log('Resolving new transformer for model');
                model.Transform = new apartmentsdotcom_1.ADC();
                break;
        }
    }
}
exports.resolveModelTransform = resolveModelTransform;
function resolveDomStructureForModel(model) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    try {
                        var fetch_1 = require('node-fetch');
                        var page = fetch_1(model.Data.url, {
                            headers: {
                                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0',
                                'Cookie': model.Cookie
                            }
                        });
                        page.then(function (resp) {
                            return resp.text();
                        }).then(function (text) {
                            try {
                                var vc = new jsdom_1.VirtualConsole();
                                var dom = new jsdom_1.JSDOM(text, {
                                    resources: "usable",
                                    pretendToBeVisual: true,
                                    virtualConsole: vc
                                });
                                console.info("Resolved dom model for: ", model.Data.url);
                                model.Transform.Dom = dom ? dom.window.document : undefined;
                                resolve(model);
                            }
                            catch (e) {
                                reject(e);
                            }
                        }).catch(function (err) { });
                    }
                    catch (e) {
                        console.error("Error while resolving DOM for model", e.message);
                        reject(e);
                    }
                })];
        });
    });
}
exports.resolveDomStructureForModel = resolveDomStructureForModel;
