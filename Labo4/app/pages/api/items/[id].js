import { updateItem, deleteItem } from "../../../services/ItemService";

export default async function handler(req, res) {
	const { id } = req.query;
	if(req.method === 'PUT'){
		const { name, price } = req.body;
		const item = updateItem(id, name, price);
		res.status(200).json(item);
	}
	else if(req.method === 'DELETE'){
		const item = deleteItem(id);
		res.status(200).json(item);
	}
	else {
		res.status(405).json({ message: 'Method Not Allowed' });
	}
}