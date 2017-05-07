import Point from './Point';

export interface WorldEntity {
	id: string,
	location: Point,
	type: string[],
	tick?: Function,
};

export class World {
	private entities:Object = {};

	public GetAllEntities():WorldEntity[] {
		return Object.values(this.entities);
	}

	public GetEntity(id:string):WorldEntity {
		return this.entities[id];
	}

	public SetEntity(what:WorldEntity):void {
		this.entities = {
			...this.entities,
			[what.id]: what,
		};
	}

	private hasEntity(entityId:string):boolean {
		return this.entities.hasOwnProperty(entityId);
	}

	public GetEntitiesAround(where:Point, radius: number = 1) {
		let nearby = [];

		for(const id in this.entities){
			const entity:WorldEntity = this.entities[id];
			if(entity.location.distanceTo(where) <= radius){
				nearby.push(entity);
			}
		}

		return nearby;
	}

	public GetEntitiesOfType(desiredType:string[], where:Point, radius:number) {
		let nearby = this.GetEntitiesAround(where, radius);

		return nearby.filter(ent => ent.type.some(val => desiredType.indexOf(val) > -1));
	}
}