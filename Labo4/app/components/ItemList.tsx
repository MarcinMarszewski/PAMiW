import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import { ItemModel } from '@/models/ItemModel';
import { ItemViewModel } from '@/viewmodels/ItemViewModel';
import Button from './Button';
import LineDiv from './LineDiv';
import Text from './Text';
import Input from './Input';

interface ItemListProps {
  viewModel: ItemViewModel;
}

const ItemList = observer(({viewModel}: ItemListProps) => {
	const [newItemName, setNewItemName] = useState('');
	const [newItemPrice, setNewItemPrice] = useState(0);
	const [editedItemId, setEditedItemId] = useState(-1);
	const [editedItemName, setEditedItemName] = useState('');
	const [editedItemPrice, setEditedItemPrice] = useState(0);

	const handleAddItem = async () => {
		await viewModel.addItem(newItemName, newItemPrice);
	}

	const handleDeleteItem = async (id : number) => {
		await viewModel.deleteItem(id);
	}

	const handleUpdateItem = async (id : number, name : string, price : number) => {
		await viewModel.updateItem(id, name, price);
		setEditedItemId(-1);
	}

	const handleEditItem = async (id : number) => {
		const item = viewModel.items.find((item: ItemModel) => item.id === id);
		if(item === undefined) return;
		setEditedItemId(item.id);
		setEditedItemName(item.name);
		setEditedItemPrice(item.price);
	}

	return (
		<div>
			<h1>Add Item</h1>
			<LineDiv>
			<Input type="text" value={newItemName} onChange={e => setNewItemName(e.target.value)} />
			<Input type="number" value={newItemPrice} onChange={e => setNewItemPrice(Number(e.target.value))} />
			<Button onClick={handleAddItem}>Add</Button>
			</LineDiv>

			<h1>Items</h1>
			<LineDiv>
				<Text>Name</Text>
				<Text>Price</Text>
				<Text/><Text>Action</Text>
			</LineDiv>
				{viewModel.items.map((item : ItemModel) => (
					<div key={item.id}>
						{editedItemId === item.id ?
						(
							<LineDiv>
								<Input type="text" value = {editedItemName} onChange={e => setEditedItemName(e.target.value)} />
								<Input type="number" value = {editedItemPrice} onChange={e => setEditedItemPrice(Number(e.target.value))} />
								<Button onClick={() => handleUpdateItem(Number(editedItemId), editedItemName, editedItemPrice)}>Update</Button>
								<Button onClick={() => setEditedItemId(-1)}>Cancel</Button>
							</LineDiv>
						)
						:
						(
							<LineDiv>
							<Text>{item.name}</Text>
							<Text>{item.price}</Text>
							<Button onClick={() => handleDeleteItem(item.id)}>Delete</Button>
							<Button onClick={() => handleEditItem(item.id)}>Edit</Button>
							</LineDiv>
						)}
					</div>
				))}
		</div>
	);
});

export default ItemList;