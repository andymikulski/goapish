export default class Memory {
	private stores:Object = {};

	AddMemory(memory:any) {
		this.stores = {
			...this.stores,
			...memory,
		};
	}

	LookupMemory(store:string) {
		return this.stores[store];
	}
}