import Point from './Point';
import {World} from './World';
import Agent from './Agent';

interface IActionProcess {
	resolve: Function,
	reject: Function,
	deltaTime: number
};

export abstract class Action {
	public abstract name:string;

	public abstract Process(info:IActionProcess):void;
	public CheckPrereqs(agent:Agent, world:World):boolean {
		return true;
	}
	public GetEffects():Object {
		return {};
	}
	public GetCost():number {
		return 1;
	}

	private time:number = 0;
	protected throttle(throttleTime: number, deltaTime:number):boolean {
		this.time += deltaTime;
		if (this.time < throttleTime) {
			return true;
		}
		this.time = 0;
		return false;
	}
}

export class ExampleAction extends Action {
	public name = 'Example';
	private progress:number = 0;

	public Process({ deltaTime, resolve, reject }):void {
		if (this.progress < 100){
			this.progress += deltaTime;
			console.log(`${this.progress}%`);
		} else {
			console.log(`done! ${this.progress}%`);
			resolve();
		}
	}
}

export class IdleAction extends Action {
	public name = 'Idle';

	public Process({ resolve }):void {
		console.log('Idling...');
		resolve();
	}

	public GetCost():number {
		return 0;
	}
}

export class MoveAction extends Action {
	public name = 'Move';

	constructor(private destination:Point, private agent:Agent, private world:World){
		super();
	}

	public CheckPrereqs(agent:Agent, world:World):boolean {
		return true;
	}

	public Process({ deltaTime, resolve, reject }):void {
		if (Point.Equals(this.agent.location, this.destination)){
			resolve();
			return;
		}

		if (this.throttle(1000, deltaTime)){
			return;
		}

		let nextPoint = this.agent.location.clone();

		if (nextPoint.x < this.destination.x) {
			if (!this.world.HasEntitiesAtPoint(nextPoint.plus(new Point(1, 0)), ['Impassible'])){
				nextPoint = nextPoint.plus(new Point(1, 0));
			}
		} else if (nextPoint.x > this.destination.x) {
			if (!this.world.HasEntitiesAtPoint(nextPoint.plus(new Point(-1, 0)), ['Impassible'])){
				nextPoint = nextPoint.plus(new Point(-1, 0));
			}
		}

		if (nextPoint.y < this.destination.y) {
			if (!this.world.HasEntitiesAtPoint(nextPoint.plus(new Point(0, 1)), ['Impassible'])){
				nextPoint = nextPoint.plus(new Point(0, 1));
			}
		} else if (nextPoint.y > this.destination.y) {
			if (!this.world.HasEntitiesAtPoint(nextPoint.plus(new Point(0, -1)), ['Impassible'])){
				nextPoint = nextPoint.plus(new Point(0, -1));
			}
		}

		// if we're close enough, check if there's something in the way
		if (Point.Distance(nextPoint, this.destination) <= 2){
			if (this.world.HasEntitiesAtPoint(this.destination, ['Impassible'])){
				reject();
				return;
			}
		}

		this.agent.location = nextPoint;
		this.world.SetEntity(this.agent);
	}

	public GetCost():number {
		// the cost for this action is the distance the agent has to travel,
		// longer distance = higher cost = agent will look for alternative route if possible
		return Point.Distance(this.agent.location, this.destination);
	}

	public GetEffects():Object {
		return {
			location: this.destination.clone()
		};
	}
}