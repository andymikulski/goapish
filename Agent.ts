import {World, WorldEntity} from './World';
import Memory from './Memory';
import {SensorySystem} from './Sensor';
import Backpack from './Backpack';
import {FoodSensor, AgentSensor} from './AgentSensors';
import Point from './Point';
import {Item, Apple} from './Items';
import {GenerateID} from './Utils';
import {Action} from './Actions';


export default class Agent implements WorldEntity {
	public type: string[] = ['Agent'];
	private memory:Memory = new Memory();
	private inventory:Backpack = new Backpack();
	private name:string = 'Johnny Five';
	private actionQueue:Action[] = [];

	private senses:SensorySystem;

	constructor(world:World, public location:Point = new Point(0,0), public id:string = GenerateID()) {
		this.senses = new SensorySystem([
			new FoodSensor(world, this),
			new AgentSensor(world, this),
		]);

		this.inventory.AddItem(new Apple(), new Apple(), new Apple());
	}

	AddAction(...acts:Action[]){
		this.actionQueue = this.actionQueue.concat(acts);
	}

	tick() {
		this.senseEnvironment();

		const currentAction:Action = this.actionQueue[0];

		if (currentAction) {
			currentAction.Process(()=>{
				this.actionQueue.shift();
			}, ()=>{
				console.log(`${currentAction.name} rejected`);
			});
		}
	}

	getMemory(store:string){
		return this.memory.LookupMemory(store);
	}

	getBackpack(){
		return this.inventory;
	}

	getBackpackItem(name:string) {
		return this.inventory.GetContentsByName(name);
	}

	public senseEnvironment() {
		const observedUpdates = this.senses.observe();

		this.memory.AddMemory(observedUpdates);
	}
}
