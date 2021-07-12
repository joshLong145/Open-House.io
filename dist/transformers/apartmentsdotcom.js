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
            var _a, _b, _c, _d, _e, _f, _g;
            var result = new Result_1.Result();
            try {
                var listWrapper = (_a = _this.Dom) === null || _a === void 0 ? void 0 : _a.getElementById('placardContainer');
                if (listWrapper) {
                    var list = listWrapper === null || listWrapper === void 0 ? void 0 : listWrapper.children[0];
                    for (var _i = 0, _h = list.children; _i < _h.length; _i++) {
                        var listing = _h[_i];
                        var section = listing === null || listing === void 0 ? void 0 : listing.children[0];
                        var addressWrapper = (_b = section === null || section === void 0 ? void 0 : section.getElementsByClassName('property-address')) === null || _b === void 0 ? void 0 : _b.item(0);
                        var titleWrapper = (_c = section === null || section === void 0 ? void 0 : section.getElementsByClassName('property-title')) === null || _c === void 0 ? void 0 : _c.item(0);
                        var urlWrapper = (_d = section === null || section === void 0 ? void 0 : section.getElementsByClassName('property-link')) === null || _d === void 0 ? void 0 : _d.item(0);
                        var priceSection = (_e = section === null || section === void 0 ? void 0 : section.getElementsByClassName('property-wrapper')) === null || _e === void 0 ? void 0 : _e.item(0);
                        var priceWrapper = (_f = priceSection === null || priceSection === void 0 ? void 0 : priceSection.getElementsByClassName('price-range')) === null || _f === void 0 ? void 0 : _f.item(0);
                        //console.log(priceWrapper[0].textContent);
                        var resValue = new Result_1.ResultValue();
                        resValue.Url = ((_g = urlWrapper) === null || _g === void 0 ? void 0 : _g.href) || '';
                        resValue.Name = (addressWrapper === null || addressWrapper === void 0 ? void 0 : addressWrapper.textContent) + " " + (titleWrapper === null || titleWrapper === void 0 ? void 0 : titleWrapper.textContent) || '';
                        if (priceWrapper === null || priceWrapper === void 0 ? void 0 : priceWrapper.textContent) {
                            var text = priceWrapper.textContent;
                            var range = text.split('-');
                            resValue.Price = range.length ? parseInt(range[0].replace(',', '').replace('$', ''), 10)
                                : parseInt(text.replace(',', '').replace('$', ''), 10);
                        }
                        result.Values.push(resValue);
                        resolve(result);
                    }
                }
                else {
                    console.info('no list content ... ');
                    resolve(result);
                }
            }
            catch (e) {
                console.error(e);
                resolve(result);
            }
        });
    };
    return ADC;
}(base_1.Base));
exports.ADC = ADC;
