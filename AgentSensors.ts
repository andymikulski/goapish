import {Sensor} from './Sensor';
import {World} from './World';
import Agent from './Agent';

export class FoodSensor extends Sensor {
	constructor(world:World, agent:Agent) {
		super('Food', world, agent);
	}

	Process():void {
		const foodNearby = this.world.GetEntitiesOfType(['Food'], this.agent.location, 2);

		foodNearby.forEach((foodEnt)=>{
			this.updates = {
				...this.updates,
				Food: {
					...this.updates.Food,
					[foodEnt.id]: { ...foodEnt },
				},
			};
		});
	}
}

export class AgentSensor extends Sensor {
	constructor(world:World, agent:Agent) {
		super('Agent', world, agent);
	}

	Process():void {
		const agentsNearby = this.world.GetEntitiesOfType(['Agent'], this.agent.location, 2);

		agentsNearby.forEach((agentEntity)=>{
			if (agentEntity.id !== this.agent.id) {
				this.updates = {
					...this.updates,
					Agent: {
						...this.updates.Agent,
						[agentEntity.id]: { ...agentEntity },
					},
				};
			}
		});
	}
}
