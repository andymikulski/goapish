import Point from './Point';

export interface WorldEntity {
	id: string,
	location: Point,
	tags: string[],
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

	public GetEntitiesAround(where:Point, radius: number = 1):WorldEntity[] {
		let nearby = [];

		for(const id in this.entities){
			const entity:WorldEntity = this.entities[id];
			if(entity.location.distanceTo(where) <= radius){
				nearby.push(entity);
			}
		}

		return nearby;
	}

	public GetEntitiesAtPoint(where:Point, tags?:string[]):WorldEntity[] {
		if (typeof tags !== 'undefined'){
			return this.GetEntitiesOfTags(tags, where, 0);
		} else {
			return this.GetEntitiesAround(where, 0);
		}
	}

	public HasEntitiesAtPoint(where:Point, tags?:string[]):boolean {
		if (typeof tags !== 'undefined'){
			return this.GetEntitiesOfTags(tags, where, 0).length > 0;
		} else {
			return this.GetEntitiesAround(where, 0).length > 0;
		}
	}

	public GetEntitiesOfTags(desiredTags:string[], where:Point, radius:number) {
		let nearby = this.GetEntitiesAround(where, radius);

		return nearby.filter((ent:WorldEntity) =>
			ent.tags.some(val => desiredTags.indexOf(val) > -1)
		);
	}
}