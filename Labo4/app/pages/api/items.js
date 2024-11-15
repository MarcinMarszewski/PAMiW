import { getItems, addItem } from "../../services/ItemService";

export default async function handler(req, res) {
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