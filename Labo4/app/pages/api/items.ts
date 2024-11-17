import { ItemModel } from '@/models/ItemModel';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const filePath = path.join(process.cwd(),'data', 'items.json');

function getItems() {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

function addItem(name : string, price : number) {
	if(!name || !price) return null;
	if(price <= 0) return null;
    const items = getItems();
	const maxId = items.length > 0 ? Math.max(...items.map((item : ItemModel) => item.id)) : 0;
    const newItem = { id: maxId+1, name, price };
    items.push(newItem);
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
    return newItem;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if(req.method === 'GET'){
		const items = getItems();
		res.status(200).json(items);
	}
	else if(req.method === 'POST'){
		const { name, price } = req.body;
		const item = addItem(name, price);
		res.status(201).json(item);
	}
	else {
		res.status(405).json({ message: 'Method Not Allowed' });
	}
}