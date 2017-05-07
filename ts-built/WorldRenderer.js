"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = require("./Point");
var WorldRenderer = (function () {
    function WorldRenderer(world) {
        this.world = world;
        this.renderArea = document.createElement('textarea');
        this.renderArea.cols = 18;
        this.renderArea.rows = 13;
        document.body.appendChild(this.renderArea);
    }
    WorldRenderer.prototype.getStringMap = function () {
        var ents = this.world.GetEntitiesAround(new Point_1.default(0, 0), 25);
        var observed = {};
        ents.forEach(function (entity) {
            observed[entity.location.x] = observed[entity.location.x] || {};
            observed[entity.location.x][entity.location.y] = entity.type.join('')[0];
        });
        var printed = [];
        for (var i = 0; i < 15; i++) {
            var row = '';
            for (var j = 0; j < 15; j++) {
                var observedHere = observed[i] && observed[i][j];
                if (i === 0 && j === 0) {
                    observedHere = "\u259A";
                }
                if (!observedHere) {
                    observedHere = '░';
                }
                row = "" + row + observedHere;
            }
            printed.push(row);
        }
        return printed;
    };
    WorldRenderer.prototype.render = function () {
        this.renderArea.textContent = this.getStringMap().join('\n');
    };
    return WorldRenderer;
}());
exports.default = WorldRenderer;
