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
var Sensor = (function () {
    function Sensor(name, world, agent) {
        if (name === void 0) { name = 'Sensor'; }
        this.name = name;
        this.world = world;
        this.agent = agent;
        this.updates = {};
    }
    ;
    Sensor.prototype.FlushUpdates = function () {
        var flushed = __assign({}, this.updates);
        this.updates = {};
        return flushed;
    };
    return Sensor;
}());
exports.Sensor = Sensor;
var SensorySystem = (function () {
    function SensorySystem(senses) {
        this.senses = senses;
    }
    SensorySystem.prototype.observe = function () {
        var observed = {};
        this.senses.forEach(function (sensor) {
            sensor.Process();
            var updates = sensor.FlushUpdates();
            var numUpdates = Object.keys(updates).length;
            if (numUpdates <= 0) {
                return;
            }
            // console.log(`Agent observed ${numUpdates} ${sensor.name.toLowerCase()}s in local environment.`);
            observed = __assign({}, observed, updates);
        });
        return observed;
    };
    return SensorySystem;
}());
exports.SensorySystem = SensorySystem;
