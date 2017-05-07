export default class Point {
	constructor(public x:number, public y:number){}

	static Distance(from:Point, to: Point):number {
		return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
	}

	static Equals(one:Point, another:Point):boolean {
		return (one.x === another.x) && (one.y === another.y);
	}

	static Plus(one:Point, another:Point):Point {
		return new Point(one.x + another.x, one.y + another.y);
	}

	distanceTo(other: Point) {
		return Point.Distance(this, other);
	}
	toString():string {
		return `${this.x}, ${this.y}`;
	}

	plus(other: Point) {
		return Point.Plus(this, other);
	}

	clone():Point {
		return new Point(this.x, this.y);
	}
};