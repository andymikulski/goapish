import Point from './Point';
import {World} from './World';
import Agent from './Agent';

export abstract class Action {
	public abstract name:string;
	public abstract CheckPrereqs(agent:Agent, world:World):boolean;
	public abstract Process(resolve:Function, reject:Function):void;
	public abstract GetEffects():Object;
}

export class ExampleAction extends Action {
	public name = 'Example';

	public CheckPrereqs():boolean {
		return true;
	}

	private progress:number = 0;
	public Process(resolve, reject):void {
		if (this.progress < 100){
			this.progress += 1;
			console.log(`${this.progress}%`);
		} else {
			console.log(`done! ${this.progress}%`);
			resolve();
		}
	}

	public GetEffects():Object {
		return {};
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

	public Process(resolve, reject):void {
		if (Point.Equals(this.agent.location, this.destination)){
			console.log('woo done!');
			resolve();
			return;
		}

		console.log('moving ...');

		if (this.agent.location.x < this.destination.x) {
			this.agent.location.x += 1;
		} else if (this.agent.location.x > this.destination.x) {
			this.agent.location.x -= 1;
		}

		if (this.agent.location.y < this.destination.y) {
			this.agent.location.y += 1;
		} else if (this.agent.location.y > this.destination.y) {
			this.agent.location.y -= 1;
		}

		this.world.SetEntity(this.agent);
	}

	public GetEffects():Object {
		return {
			location: this.destination.clone()
		};
	}
}