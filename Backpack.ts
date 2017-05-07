import {Item} from './Items';

export default class Backpack {
	private contents:Object = {};

	public AddItem(...items:Item[]) {
		items.forEach((item:Item)=>{
			const {
				id,
				name,
			} = item;

			if (!id || !name) {
				throw new Error("Can't add backpack item, id or name was invalid");
			}

			const existingEntry = this.contents[name];

			if (existingEntry){
				this.contents[name] = {
					...existingEntry,
					quantity: existingEntry.quantity + 1,
					list: existingEntry.list.concat([item])
				};
			} else {
				this.contents[name] = {
					...item,
					quantity: 1,
					list: [item],
				};
			}
		});
	}

	public GetContentsByName(name):Object {
		if (this.contents[name]){
			return this.contents[name];
		}
	}

	public GetContents():Object {
		return this.contents;
	}
}
