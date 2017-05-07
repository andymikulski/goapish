"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = require("./Point");
var Utils_1 = require("./Utils");
var Item = (function () {
    function Item(location) {
        if (location === void 0) { location = new Point_1.default(0, 0); }
        this.location = location;
        this.id = Utils_1.GenerateID();
    }
    ;
    Item.prototype.isOfType = function (requestedType) {
        return this.type.indexOf(requestedType) > -1;
    };
    return Item;
}());
exports.Item = Item;
var Apple = (function (_super) {
    __extends(Apple, _super);
    function Apple() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Apple";
        _this.type = ["Food"];
        return _this;
    }
    return Apple;
}(Item));
exports.Apple = Apple;
