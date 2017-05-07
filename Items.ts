import Point from './Point';
import {WorldEntity} from './World';
import {GenerateID} from './Utils';

export abstract class Item implements WorldEntity {
	public abstract name:string;
	public abstract tags:string[];
	public id:string = GenerateID();

	constructor(
		public location:Point = new Point(0, 0),
	){};

	isOfTag(requestedTag:string):boolean {
		return this.tags.indexOf(requestedTag) > -1;
	}
}

export class Apple extends Item {
	name:string = "Apple";
	tags:string[] = ["Food"];
}