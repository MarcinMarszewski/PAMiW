import {makeAutoObservable} from 'mobx';
import axios from 'axios';
import {ItemModel} from '../models/ItemModel';

export class ItemViewModel {
	items = [];

	constructor(){ 
		makeAutoObservable(this);
	}

	async fetchItems(){
		const response = await axios.get("/api/items");
		this.items = response.data.map(item => new ItemModel(item.id, item.name, item.price));
	}

	async addItem(name, price){
		const response = await axios.post("/api/items", {name, price});
		this.items.push(new ItemModel(response.data.id, response.data.name, response.data.price));
	}

	async updateItem(id, name, price){
		const response = await axios.put(`/api/items/${id}`, {name, price});
		const item = this.items.find(item => item.id === response.data.id);
		if (item) {
			item.name = response.data.name;
			item.price = response.data.price;
		}
	}

	async deleteItem(id){
		const response = await axios.delete(`/api/items/${id}`);
		this.items = this.items.filter(item => item.id !== Number(response.data.id));
	}
}