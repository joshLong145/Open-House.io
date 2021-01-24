"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = exports.ResultValue = void 0;
var ResultValue = /** @class */ (function () {
    function ResultValue() {
        this._name = '';
        this._price = 0;
        this._url = '';
    }
    Object.defineProperty(ResultValue.prototype, "Name", {
        get: function () { return this._name; },
        set: function (value) { this._name = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResultValue.prototype, "Price", {
        get: function () { return this._price; },
        set: function (value) { this._price = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResultValue.prototype, "Url", {
        get: function () { return this._url; },
        set: function (value) { this._url = value; },
        enumerable: false,
        configurable: true
    });
    return ResultValue;
}());
exports.ResultValue = ResultValue;
var Result = /** @class */ (function () {
    function Result() {
        this._status = 0;
        this._values = [];
        this._id = "1";
    }
    Object.defineProperty(Result.prototype, "Id", {
        get: function () { return this._id; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "Status", {
        get: function () { return this._status; },
        set: function (value) { this._status = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "Values", {
        get: function () { return this._values; },
        enumerable: false,
        configurable: true
    });
    return Result;
}());
exports.Result = Result;
