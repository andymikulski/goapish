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
var Memory = (function () {
    function Memory() {
        this.stores = {};
    }
    Memory.prototype.AddMemory = function (memory) {
        this.stores = __assign({}, this.stores, memory);
    };
    Memory.prototype.LookupMemory = function (store) {
        return this.stores[store];
    };
    return Memory;
}());
exports.default = Memory;
