import { ItemModel } from "../models/ItemModel";

export interface IItemService {
	getItems(): Promise<ItemModel[]>;
	addItem(name: string, price: number): Promise<ItemModel>;
	updateItem(id: number, name: string, price: number): Promise<ItemModel>;
	deleteItem(id: number): Promise<{id: number}>;
}