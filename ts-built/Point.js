"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.Distance = function (from, to) {
        return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
    };
    Point.Equals = function (one, another) {
        return (one.x === another.x) && (one.y === another.y);
    };
    Point.prototype.distanceTo = function (other) {
        return Point.Distance(this, other);
    };
    Point.prototype.toString = function () {
        return this.x + ", " + this.y;
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    return Point;
}());
exports.default = Point;
;
