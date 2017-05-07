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

		ents.forEach((entity:WorldEntity)=>{
			observed[entity.location.x] = observed[entity.location.x] || {};
			observed[entity.location.x][entity.location.y] = entity.type.join('')[0];
		});

		let printed = [];

		for(let i = 0; i < 15; i++){
			let row = '';
			for(let j = 0; j < 15; j++){
				let observedHere = observed[i] && observed[i][j];

				if (i === 0 && j === 0){
					observedHere = `▚`;
				}

				if (!observedHere) {
					observedHere = '░';
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