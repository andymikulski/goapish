"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Memory_1 = require("./Memory");
var Sensor_1 = require("./Sensor");
var Backpack_1 = require("./Backpack");
var AgentSensors_1 = require("./AgentSensors");
var Point_1 = require("./Point");
var Items_1 = require("./Items");
var Utils_1 = require("./Utils");
var Agent = (function () {
    function Agent(world, location, id) {
        if (location === void 0) { location = new Point_1.default(0, 0); }
        if (id === void 0) { id = Utils_1.GenerateID(); }
        this.location = location;
        this.id = id;
        this.type = ['Agent'];
        this.memory = new Memory_1.default();
        this.inventory = new Backpack_1.default();
        this.name = 'Johnny Five';
        this.actionQueue = [];
        this.senses = new Sensor_1.SensorySystem([
            new AgentSensors_1.FoodSensor(world, this),
            new AgentSensors_1.AgentSensor(world, this),
        ]);
        this.inventory.AddItem(new Items_1.Apple(), new Items_1.Apple(), new Items_1.Apple());
    }
    Agent.prototype.AddAction = function () {
        var acts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            acts[_i] = arguments[_i];
        }
        this.actionQueue = this.actionQueue.concat(acts);
    };
    Agent.prototype.tick = function () {
        var _this = this;
        this.senseEnvironment();
        var currentAction = this.actionQueue[0];
        if (currentAction) {
            currentAction.Process(function () {
                _this.actionQueue.shift();
            }, function () {
                console.log(currentAction.name + " rejected");
            });
        }
    };
    Agent.prototype.getMemory = function (store) {
        return this.memory.LookupMemory(store);
    };
    Agent.prototype.getBackpack = function () {
        return this.inventory;
    };
    Agent.prototype.getBackpackItem = function (name) {
        return this.inventory.GetContentsByName(name);
    };
    Agent.prototype.senseEnvironment = function () {
        var observedUpdates = this.senses.observe();
        this.memory.AddMemory(observedUpdates);
    };
    return Agent;
}());
exports.default = Agent;
