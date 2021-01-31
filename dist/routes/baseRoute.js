"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoute = void 0;
var BaseRoute = /** @class */ (function () {
    function BaseRoute(router) {
        this._router = router;
    }
    Object.defineProperty(BaseRoute.prototype, "Router", {
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    BaseRoute.prototype.timeLog = function (req, res, next) {
        console.log('Time: ', Date.now());
        next();
    };
    return BaseRoute;
}());
exports.BaseRoute = BaseRoute;
