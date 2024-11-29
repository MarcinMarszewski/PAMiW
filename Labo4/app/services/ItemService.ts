import {ItemModel} from '../models/ItemModel';
import {IItemService} from './IItemService';
import axios from 'axios';

const ipv4 : string = "10.66.25.153:3000"

export class ItemService implements IItemService {
	async getItems(): Promise<ItemModel[]> {
		try{
		const response = await axios.get(`http://`+ipv4+`/api/items`);
		return response.data;
		}catch(err : any){
			alert(err.message + "\n" + err.response.data.error);
		}
		return [];
	};

	async addItem(name: string, price: number): Promise<ItemModel> {
		try{
		const response = await axios.post(`http://`+ipv4+`/api/items`, {name, price:Number(price)});
		return response.data;
		}catch(err : any){
			alert(err.message + "\n" + err.response.data.error);
		}
		return {} as ItemModel;
	}

	async updateItem(id: number, name: string, price: number): Promise<ItemModel> {
		try{
		const response = await axios.put(`http://`+ipv4+`/api/items/${id}`, {name, price:Number(price)});
		return response.data;
		}catch(err : any){
			alert(err.message + "\n" + err.response.data.error);
		}
		return {} as ItemModel;
	}

	async deleteItem(id: number): Promise<{id: number}> {
		try{
		const response = await axios.delete(`http://`+ipv4+`/api/items/${id}`);
		return response.data;
		}catch(err : any){
			alert(err.message + "\n" + err.response.data.error);
		}
		return {id: -1};
	}
}