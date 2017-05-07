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
;
var World = (function () {
    function World() {
        this.entities = {};
    }
    World.prototype.GetAllEntities = function () {
        return Object.values(this.entities);
    };
    World.prototype.GetEntity = function (id) {
        return this.entities[id];
    };
    World.prototype.SetEntity = function (what) {
        this.entities = __assign({}, this.entities, (_a = {}, _a[what.id] = what, _a));
        var _a;
    };
    World.prototype.hasEntity = function (entityId) {
        return this.entities.hasOwnProperty(entityId);
    };
    World.prototype.GetEntitiesAround = function (where, radius) {
        if (radius === void 0) { radius = 1; }
        var nearby = [];
        for (var id in this.entities) {
            var entity = this.entities[id];
            if (entity.location.distanceTo(where) <= radius) {
                nearby.push(entity);
            }
        }
        return nearby;
    };
    World.prototype.GetEntitiesOfType = function (desiredType, where, radius) {
        var nearby = this.GetEntitiesAround(where, radius);
        return nearby.filter(function (ent) { return ent.type.some(function (val) { return desiredType.indexOf(val) > -1; }); });
    };
    return World;
}());
exports.World = World;
