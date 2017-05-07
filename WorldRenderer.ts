import Point from './Point';
import {World, WorldEntity} from './World';

export default class WorldRenderer {
	private renderArea:any;

	constructor(private world:World){
		this.renderArea = document.createElement('textarea');
		this.renderArea.cols = 18;
		this.renderArea.rows = 13;
		document.body.appendChild(this.renderArea);
	}

	getStringMap():string[] {
		const ents:WorldEntity[] = this.world.GetEntitiesAround(new Point(0,0), 25);

		const observed = {}

		const agents = [];

		ents.forEach((entity:WorldEntity)=>{
			observed[entity.location.x] = observed[entity.location.x] || {};
			observed[entity.location.x][entity.location.y] = entity.tags.join('')[0];

			if (entity.tags.indexOf('Agent') > -1){
				agents.push(entity.location);
			}
		});

		let printed = [];

		for(let i = 0; i < 15; i++){
			let row = '';
			for(let j = 0; j < 15; j++){
				let observedHere = observed[j] && observed[j][i];

				if (i === 0 && j === 0){
					observedHere = `ø`;
				}

				if (!observedHere) {
					observedHere = '░';

					agents.some((agentLocation)=>{
						if(Point.Distance(new Point(j, i), agentLocation) <= 2) {
							if (!this.world.HasEntitiesAtPoint(new Point(j, i))){
								observedHere = '▒';
							}
							return true;
						}
						return false;
					});
				}

				row = `${row}${observedHere}`;
			}
			printed.push(row);
		}

		return printed;
	}

	render(){
		this.renderArea.textContent = this.getStringMap().join('\n');
	}
}