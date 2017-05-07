import Point from './Point';
import {World, WorldEntity} from './World';
import {Apple} from './Items';
import Agent from './Agent';
import WorldRenderer from './WorldRenderer';
import {MoveAction, ExampleAction} from './Actions';


const worldTick = ()=>{
	world.GetAllEntities().forEach((entity:WorldEntity)=>{
		if (entity.tick){
			entity.tick();
		}
	});

	renderer.render();
	requestAnimationFrame(worldTick);
};

console.clear();
document.body.innerHTML = '';

const world:World = new World();
const renderer = new WorldRenderer(world);

worldTick();

const apple:Apple = new Apple(new Point(1,1));
const agent:Agent = new Agent(world, new Point(0,0));

world.SetEntity(apple);
world.SetEntity(agent);

agent.location = new Point(10,10);
world.SetEntity(agent);

setTimeout(()=>{
	console.log('adding move action');
	agent.AddAction(
		new MoveAction(apple.location, agent, world),
		new ExampleAction(),

	);
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