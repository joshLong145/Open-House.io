"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADC = void 0;
var base_1 = require("./base");
var Result_1 = require("./../models/Result");
var ADC = /** @class */ (function (_super) {
    __extends(ADC, _super);
    function ADC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ADC.prototype.transform = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a, _b, _c;
            var result = new Result_1.Result();
            try {
                var listWrapper = (_a = _this.Dom) === null || _a === void 0 ? void 0 : _a.getElementById('placardContainer');
                if (listWrapper) {
                    var list = listWrapper === null || listWrapper === void 0 ? void 0 : listWrapper.children[0];
                    for (var _i = 0, _d = list.children; _i < _d.length; _i++) {
                        var listing = _d[_i];
                        var section = listing === null || listing === void 0 ? void 0 : listing.children[0];
                        var addressWrapper = (_c = (_b = section === null || section === void 0 ? void 0 : section.children[0]) === null || _b === void 0 ? void 0 : _b.children[0]) === null || _c === void 0 ? void 0 : _c.children[0];
                        var address;
                        if (addressWrapper) {
                            address = addressWrapper === null || addressWrapper === void 0 ? void 0 : addressWrapper.children[1];
                            // console.log(address.textContent, addressWrapper.href);
                        }
                        var priceSection = section.children[1];
                        var priceWrapper = priceSection.getElementsByClassName('price-range');
                        //console.log(priceWrapper[0].textContent);
                        var resValue = new Result_1.ResultValue();
                        resValue.Url = addressWrapper.href;
                        resValue.Name = address.textContent;
                        resValue.Price = priceWrapper[0].textContent;
                        result.Values.push(resValue);
                        resolve(result);
                    }
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    };
    return ADC;
}(base_1.Base));
exports.ADC = ADC;
