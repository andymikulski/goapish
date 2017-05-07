import {World} from './World';
import Agent from './Agent';

export abstract class Sensor {
	protected updates:any = {};

	constructor(
		public name:string = 'Sensor',
		protected world:World,
		protected agent:Agent,
	){};

	abstract Process():void;

	FlushUpdates():Object {
		const flushed:Object = { ...this.updates };
		this.updates = {};

		return flushed;
	}
}

export class SensorySystem {
	constructor(private senses:Sensor[]){}

	observe() {
		let observed = {};
		this.senses.forEach((sensor:Sensor)=>{
			sensor.Process();
			const updates = sensor.FlushUpdates();
			const numUpdates = Object.keys(updates).length;

			if(numUpdates <= 0){
				return;
			}

			// console.log(`Agent observed ${numUpdates} ${sensor.name.toLowerCase()}s in local environment.`);

			observed = {
				...observed,
				...updates,
			};
		});

		return observed;
	}
}