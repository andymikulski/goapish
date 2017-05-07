"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = require("./Point");
var World_1 = require("./World");
var Items_1 = require("./Items");
var Agent_1 = require("./Agent");
var WorldRenderer_1 = require("./WorldRenderer");
var Actions_1 = require("./Actions");
var worldTick = function () {
    world.GetAllEntities().forEach(function (entity) {
        if (entity.tick) {
            entity.tick();
        }
    });
    renderer.render();
    requestAnimationFrame(worldTick);
};
console.clear();
document.body.innerHTML = '';
var world = new World_1.World();
var renderer = new WorldRenderer_1.default(world);
worldTick();
var apple = new Items_1.Apple(new Point_1.default(1, 1));
var agent = new Agent_1.default(world, new Point_1.default(0, 0));
world.SetEntity(apple);
world.SetEntity(agent);
agent.location = new Point_1.default(10, 10);
world.SetEntity(agent);
setTimeout(function () {
    console.log('adding move action');
    agent.AddAction(new Actions_1.MoveAction(apple.location, agent, world), new Actions_1.ExampleAction());
}, 5000);
// // setTimeout(()=>{
// // 	setTimeout(()=>{
// // 		agent.location = new Point(2,3);
// // 		world.SetEntity(agent);
// // 		setTimeout(()=>{
// // 			apple.location = new Point(10,10);
// // 			world.SetEntity(apple);
// // 			setTimeout(()=>{
// // 				agent.location = new Point(9,10);
// // 			}, 2000);
// // 		}, 2000);
// // 	}, 2000);
// // }, 2000); 
