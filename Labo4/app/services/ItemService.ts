import {ItemModel} from '../models/ItemModel';
import {IItemService} from './IItemService';
import axios from 'axios';

export class ItemService implements IItemService {
	async getItems(): Promise<ItemModel[]> {
		const response = await axios.get(`/api/items`);
		return response.data;
	};

	async addItem(name: string, price: number): Promise<ItemModel> {
		const response = await axios.post(`/api/items`, {name, price});
		return response.data;
	}

	async updateItem(id: number, name: string, price: number): Promise<ItemModel> {
		const response = await axios.put(`/api/items/${id}`, {name, price});
		return response.data;
	}

	async deleteItem(id: number): Promise<{id: number}> {
		const response = await axios.delete(`/api/items/${id}`);
		return response.data;
	}
}
