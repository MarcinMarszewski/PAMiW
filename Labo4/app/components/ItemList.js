import {observer} from 'mobx-react-lite';
import {useState} from 'react';

const ItemList = observer(({viewModel}) => {
	const [newItemName, setNewItemName] = useState('');
	const [newItemPrice, setNewItemPrice] = useState(0);
	const [editedItemId, setEditedItemId] = useState(null);
	const [editedItemName, setEditedItemName] = useState('');
	const [editedItemPrice, setEditedItemPrice] = useState(0);

	const handleAddItem = async () => {
		await viewModel.addItem(newItemName, newItemPrice);
	}

	const handleDeleteItem = async (id) => {
		await viewModel.deleteItem(id);
	}

	const handleUpdateItem = async (id, name, price) => {
		await viewModel.updateItem(id, name, price);
		setEditedItemId(null);
	}

	const handleEditItem = async (id) => {
		const item = viewModel.items.find(item => item.id === id);
		setEditedItemId(item.id);
		setEditedItemName(item.name);
		setEditedItemPrice(item.price);
	}

	return (
		<div>
			<h1>Add Item</h1>
			<input type="text" value={newItemName} onChange={e => setNewItemName(e.target.value)} />
			<input type="number" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} />
			<button onClick={handleAddItem}>Add</button>

			<h1>Items</h1>
			<ul>
				{viewModel.items.map(item => (
					<li key={item.id}>
						{editedItemId === item.id ?
						(
							<div>
								<input type="text" value = {editedItemName} onChange={e => setEditedItemName(e.target.value)} />
								<input type="number" value = {editedItemPrice} onChange={e => setEditedItemPrice(e.target.value)} />
								<button onClick={() => handleUpdateItem(editedItemId, editedItemName, editedItemPrice)}>Update</button>
							</div>
						)
						:
						(
							<div>
							{item.name} - ${item.price}
							<button onClick={() => handleDeleteItem(item.id)}>Delete</button>
							<button onClick={() => handleEditItem(item.id)}>Edit</button>
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
});

export default ItemList;