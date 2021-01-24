"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
var Base = /** @class */ (function () {
    function Base() {
    }
    Object.defineProperty(Base.prototype, "Dom", {
        get: function () { return this._dom; },
        set: function (value) { this._dom = value; },
        enumerable: false,
        configurable: true
    });
    return Base;
}());
exports.Base = Base;
;
