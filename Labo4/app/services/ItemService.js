import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'data/items.json');

export const getItems = () => {
	if (!fs.existsSync(filePath)) {
		return [];
	}

	const data = fs.readFileSync(filePath);
	return JSON.parse(data);
};

export const saveItems = (items) => {
	fs.writeFileSync(filePath, JSON.stringify(items));
};

export const addItem = (name, price) => {
	const items = getItems();
	const id = Math.max(0, ...items.map(item => item.id)) + 1;
	const newItem = {id: Number(id), name, price: Number(price)};
	items.push(newItem);
	saveItems(items);
	return newItem;
}

export const updateItem = (id, name, price) => {
	let items = getItems();
	const item = items.find(item => item.id === Number(id));
	if (item) {
		item.name = name;
		item.price = Number(price);
		saveItems(items);
		return item;
	}
}

export const deleteItem = (id) => {
	let items = getItems();
	items = items.filter(item => item.id !== Number(id));
	saveItems(items);
	return {id};
}
