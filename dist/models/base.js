"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTransformModel = void 0;
var BaseTransformModel = /** @class */ (function () {
    function BaseTransformModel(data, limit, cookie, price) {
        this._data = data;
        this._dataParseLimit = limit;
        this._cookie = cookie;
        this._price = price;
    }
    Object.defineProperty(BaseTransformModel.prototype, "Data", {
        get: function () { return this._data; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTransformModel.prototype, "DataParseLimit", {
        get: function () { return this._dataParseLimit; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTransformModel.prototype, "DataParseResult", {
        get: function () { return this._dataParseLimit; },
        set: function (value) { this._dataParseResult = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTransformModel.prototype, "Cookie", {
        get: function () { return this._cookie; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTransformModel.prototype, "Price", {
        get: function () { return this._price; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTransformModel.prototype, "Transform", {
        get: function () { return this._transform; },
        set: function (value) { this._transform = value; },
        enumerable: false,
        configurable: true
    });
    return BaseTransformModel;
}());
exports.BaseTransformModel = BaseTransformModel;
