import fs from 'fs';
import path from 'path';
import { ItemModel } from '@/models/ItemModel';
import { NextApiRequest, NextApiResponse } from 'next';

const filePath = path.join(process.cwd(),'data', 'items.json');

function getItems() {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

function updateItem(id : number, name : string, price : number) {
    if(!name || !price) return null;
    if(price <= 0) return null;
    const items = getItems();
    const index = items.findIndex((item : ItemModel) => item.id === id);
    if (index !== -1) {
        items[index] = { id: id, name, price };
        fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
        return items[index];
    }
    return null;
}

function deleteItem(id : number) {
    const items = getItems();
    const index = items.findIndex((item : ItemModel) => item.id === id);
    if (index !== -1) {
        const deletedItem = items.splice(index, 1)[0];
        fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
        return deletedItem;
    }
    return null;
}

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
	const { id } = req.query;
	if(req.method === 'PUT'){
		const { name, price } = req.body;
		const item = updateItem(Number(id), name, price);
		res.status(200).json(item);
	}
	else if(req.method === 'DELETE'){
		const item = deleteItem(Number(id));
		res.status(200).json(item);
	}
	else {
		res.status(405).json({ message: 'Method Not Allowed' });
	}
}