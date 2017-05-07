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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sensor_1 = require("./Sensor");
var FoodSensor = (function (_super) {
    __extends(FoodSensor, _super);
    function FoodSensor(world, agent) {
        return _super.call(this, 'Food', world, agent) || this;
    }
    FoodSensor.prototype.Process = function () {
        var _this = this;
        var foodNearby = this.world.GetEntitiesOfType(['Food'], this.agent.location, 2);
        foodNearby.forEach(function (foodEnt) {
            _this.updates = __assign({}, _this.updates, { Food: __assign({}, _this.updates.Food, (_a = {}, _a[foodEnt.id] = __assign({}, foodEnt), _a)) });
            var _a;
        });
    };
    return FoodSensor;
}(Sensor_1.Sensor));
exports.FoodSensor = FoodSensor;
var AgentSensor = (function (_super) {
    __extends(AgentSensor, _super);
    function AgentSensor(world, agent) {
        return _super.call(this, 'Agent', world, agent) || this;
    }
    AgentSensor.prototype.Process = function () {
        var _this = this;
        var agentsNearby = this.world.GetEntitiesOfType(['Agent'], this.agent.location, 2);
        agentsNearby.forEach(function (agentEntity) {
            if (agentEntity.id !== _this.agent.id) {
                _this.updates = __assign({}, _this.updates, { Agent: __assign({}, _this.updates.Agent, (_a = {}, _a[agentEntity.id] = __assign({}, agentEntity), _a)) });
            }
            var _a;
        });
    };
    return AgentSensor;
}(Sensor_1.Sensor));
exports.AgentSensor = AgentSensor;
