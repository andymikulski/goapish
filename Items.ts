import Point from './Point';
import {WorldEntity} from './World';
import {GenerateID} from './Utils';

export abstract class Item implements WorldEntity {
	public abstract name:string;
	public abstract type:string[];
	public id:string = GenerateID();

	constructor(
		public location:Point = new Point(0, 0),
	){};

	isOfType(requestedType:string):boolean {
		return this.type.indexOf(requestedType) > -1;
	}
}

export class Apple extends Item {
	name:string = "Apple";
	type:string[] = ["Food"];
}