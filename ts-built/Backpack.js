"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Backpack = (function () {
    function Backpack() {
        this.contents = {};
    }
    Backpack.prototype.AddItem = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        items.forEach(function (item) {
            var id = item.id, name = item.name;
            if (!id || !name) {
                throw new Error("Can't add backpack item, id or name was invalid");
            }
            var existingEntry = _this.contents[name];
            if (existingEntry) {
                _this.contents[name] = __assign({}, existingEntry, { quantity: existingEntry.quantity + 1, list: existingEntry.list.concat([item]) });
            }
            else {
                _this.contents[name] = __assign({}, item, { quantity: 1, list: [item] });
            }
        });
    };
    Backpack.prototype.GetContentsByName = function (name) {
        if (this.contents[name]) {
            return this.contents[name];
        }
    };
    Backpack.prototype.GetContents = function () {
        return this.contents;
    };
    return Backpack;
}());
exports.default = Backpack;
