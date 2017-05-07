import Point from './Point';
import {World, WorldEntity} from './World';
import {Apple} from './Items';
import Agent from './Agent';
import WorldRenderer from './WorldRenderer';
import {MoveAction, ExampleAction} from './Actions';


let lastTick:number;
let deltaTime:number;

const worldTick = ()=>{
	lastTick = lastTick ? Date.now() - lastTick : 0;
	world.GetAllEntities().forEach((entity:WorldEntity)=>{
		if (entity.tick){
			entity.tick(lastTick);
		}
	});

	renderer.render();

	lastTick = Date.now();
	requestAnimationFrame(worldTick);
};

console.clear();
document.body.innerHTML = '';

const world:World = new World();
const renderer = new WorldRenderer(world);

worldTick();

const apple:Apple = new Apple(new Point(10,10));
world.SetEntity(apple);

const agent:Agent = new Agent(world, new Point(1, 1));
world.SetEntity(agent);


const secondAgent:Agent = new Agent(world, new Point(5,5));
world.SetEntity(secondAgent);

agent.AddAction(
	new ExampleAction(),
	new MoveAction(apple.location, agent, world),
	new ExampleAction(),
	new MoveAction(secondAgent.location, agent, world),
	new ExampleAction(),
);