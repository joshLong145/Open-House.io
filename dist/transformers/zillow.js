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
exports.Zillow = void 0;
var base_1 = require("./base");
var Result_1 = require("./../models/Result");
var Zillow = /** @class */ (function (_super) {
    __extends(Zillow, _super);
    function Zillow() {
        return _super.call(this) || this;
    }
    Zillow.prototype.transform = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var result = new Result_1.Result();
            try {
                for (var _i = 0, _a = _this.Dom.body.children; _i < _a.length; _i++) {
                    var el = _a[_i];
                    if (el.id == 'wrapper') {
                        var list = el.getElementsByClassName('photo-cards_wow photo-cards_short');
                        // we assume here there is only element with this class combinatation in the parent.
                        for (var _b = 0, _c = list[0].children; _b < _c.length; _b++) {
                            var listEl = _c[_b];
                            var outerWrapper = listEl.getElementsByClassName('list-card');
                            // console.log(outerWrapper)
                            if (outerWrapper.length) {
                                var div = outerWrapper[0].getElementsByClassName('list-card-info');
                                var aTagWrapper = div[0].children[0];
                                var name_1 = aTagWrapper.children[0].textContent;
                                if (div.length) {
                                    var priceWrapper = div[0].getElementsByClassName('list-card-price');
                                    var price = priceWrapper[0].textContent;
                                    price = _this.prasePrice(price);
                                    var resValue = new Result_1.ResultValue();
                                    resValue.Url = aTagWrapper.href;
                                    resValue.Name = name_1;
                                    resValue.Price = price;
                                    result.Values.push(resValue);
                                    //console.log(name, price, aTagWrapper.href);
                                }
                            }
                        }
                        result.Status = 200;
                        resolve(result);
                    }
                }
            }
            catch (e) {
                result.Status = 500;
                resolve(result);
            }
        });
    };
    Zillow.prototype.prasePrice = function (price) {
        var result = price.match(/(\$[0-9,]+(\.[0-9]{2})?)/);
        return result[0];
    };
    return Zillow;
}(base_1.Base));
exports.Zillow = Zillow;
