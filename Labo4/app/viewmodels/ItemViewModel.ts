import {makeAutoObservable} from 'mobx';
import {ItemModel} from '../models/ItemModel';
import {IItemService} from '../services/IItemService';

export class ItemViewModel {
	items: ItemModel[] = [];
	itemService: IItemService;

	constructor(service: IItemService){ 
		makeAutoObservable(this);
		this.itemService = service;
		this.fetchItems();
	}

	async fetchItems(){
		const response = await this.itemService.getItems();
		if(!response) return;
		this.items = response;
	}

	async addItem(name : string, price : number){
		const response = await this.itemService.addItem(name, price);
		if(!response) return;
		this.items.push(response);
	}

	async updateItem(id: number, name: string, price: number){
		const response = await this.itemService.updateItem(id, name, price);
		if(!response) return;
		const index = this.items.findIndex(item => item.id === response.id);
		this.items[index] = response;
	}

	async deleteItem(id: number){
		const response = await this.itemService.deleteItem(id);
		if(!response) return;
		this.items = this.items.filter(item => item.id !== response.id);
	}
}