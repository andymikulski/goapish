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
world.SetEntity(apple);

const agent:Agent = new Agent(world, new Point(10, 10));
world.SetEntity(agent);


const secondAgent:Agent = new Agent(world, new Point(5,5));
world.SetEntity(secondAgent);

agent.AddAction(
	new MoveAction(apple.location, agent, world),
	new ExampleAction(),
	new MoveAction(new Point(5,6), agent, world),
	new ExampleAction(),
	new MoveAction(new Point(10,2), agent, world),
	new ExampleAction(),
	new MoveAction(new Point(1,2), agent, world)
);

secondAgent.AddAction(
	new ExampleAction(),
	new MoveAction(new Point(10, 10), secondAgent, world),
	new MoveAction(apple.location, secondAgent, world),
	new MoveAction(new Point(1,1), secondAgent, world),
	new ExampleAction(),
	new MoveAction(new Point(10, 1), secondAgent, world)
);