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
var Action = (function () {
    function Action() {
    }
    return Action;
}());
exports.Action = Action;
var ExampleAction = (function (_super) {
    __extends(ExampleAction, _super);
    function ExampleAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'Example';
        _this.progress = 0;
        return _this;
    }
    ExampleAction.prototype.CheckPrereqs = function () {
        return true;
    };
    ExampleAction.prototype.Process = function (resolve, reject) {
        if (this.progress < 100) {
            this.progress += 1;
            console.log(this.progress + "%");
        }
        else {
            console.log("done! " + this.progress + "%");
            resolve();
        }
    };
    ExampleAction.prototype.GetEffects = function () {
        return {};
    };
    return ExampleAction;
}(Action));
exports.ExampleAction = ExampleAction;
var MoveAction = (function (_super) {
    __extends(MoveAction, _super);
    function MoveAction(destination, agent, world) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.agent = agent;
        _this.world = world;
        _this.name = 'Move';
        return _this;
    }
    MoveAction.prototype.CheckPrereqs = function (agent, world) {
        return true;
    };
    MoveAction.prototype.Process = function (resolve, reject) {
        if (Point_1.default.Equals(this.agent.location, this.destination)) {
            console.log('woo done!');
            resolve();
            return;
        }
        console.log('moving ...');
        if (this.agent.location.x < this.destination.x) {
            this.agent.location.x += 1;
        }
        else if (this.agent.location.x > this.destination.x) {
            this.agent.location.x -= 1;
        }
        if (this.agent.location.y < this.destination.y) {
            this.agent.location.y += 1;
        }
        else if (this.agent.location.y > this.destination.y) {
            this.agent.location.y -= 1;
        }
        this.world.SetEntity(this.agent);
    };
    MoveAction.prototype.GetEffects = function () {
        return {
            location: this.destination.clone()
        };
    };
    return MoveAction;
}(Action));
exports.MoveAction = MoveAction;
