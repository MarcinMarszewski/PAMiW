import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import { TaskModel } from '@/models/TaskModel';
import { TaskViewModel } from '@/viewmodels/TaskViewModel';
import Button from './Button';
import LineDiv from './LineDiv';
import Text from './Text';
import Input from './Input';

interface ItemListProps {
  viewModel: TaskViewModel;
}

const ItemList = observer(({viewModel}: ItemListProps) => {
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [newTaskDueDate, setNewTaskDueDate] = useState<Date | null>(null);
	const [editedTaskId, setEditedTaskId] = useState('');
	const [editedTaskTitle, setEditedTaskTitle] = useState('');
	const [editedTaskDueDate, setEditedTaskDueDate] = useState<Date | null>(null);

	const handleAddTask = async () => {
		if(newTaskDueDate === null) await viewModel.addTask(newTaskTitle, newTaskDueDate);
		else await viewModel.addTask(newTaskTitle, new Date(newTaskDueDate));
	}

	const handleCompleteTask = async (id : string) => {
		await viewModel.completeTask(id);
	}

	const handleUncompleteTask = async (id : string) => {
		await viewModel.uncompleteTask(id);
	}

	const handleDeleteTask = async (id : string) => {
		await viewModel.deleteTask(id);
	}

	const handleEditTask = async (id: string) => {
		const task = viewModel.tasks.find(task => task.id === id);
		if(task){
			setEditedTaskId(task.id);
			setEditedTaskTitle(task.title || '');
			setEditedTaskDueDate(task.dueDate ? new Date(task.dueDate) : null);
		}
	}

	const handleUpdateTask = async () => {
		if(editedTaskDueDate === null) await viewModel.updateItem(editedTaskId, editedTaskTitle, editedTaskDueDate);
		else await viewModel.updateItem(editedTaskId, editedTaskTitle, new Date(editedTaskDueDate));
		setEditedTaskId('');
		setEditedTaskTitle('');
		setEditedTaskDueDate(null);
	}

	return (
		<div>
			<h1>Add Task</h1>
			<LineDiv>
			<Input type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} />
			<Input type="date" value={newTaskDueDate !== null ? newTaskDueDate.toISOString().split('T')[0] : ''} onChange={e => setNewTaskDueDate(e.target.value ? new Date(e.target.value) : null)} />
			<Button onClick={handleAddTask}>Add</Button>
			</LineDiv>

			<h1>Tasks</h1>
				{viewModel.tasks.map((task : TaskModel) => (
					<div key={task.id}>
						{editedTaskId === task.id ?
						(
							<LineDiv>
							<Input type="text" value={editedTaskTitle} onChange={e => setEditedTaskTitle(e.target.value)} />
							<Input type="date" value={editedTaskDueDate !== null ? editedTaskDueDate.toISOString().split('T')[0] : ''} onChange={e => setEditedTaskDueDate(e.target.value ? new Date(e.target.value) : null)} />
							<Button onClick={handleUpdateTask}>Update</Button>
							</LineDiv>
						)
						:
						(
							<LineDiv>
							<Text>{task.title}</Text>
							<Text>{task.dueDate?.toString()}</Text>
							<Text>{task.completed ? "Completed" : "Not Completed"}</Text>
							{task.completed ? <Button onClick={() => handleUncompleteTask(task.id)}>Uncomplete</Button> : <Button onClick={() => handleCompleteTask(task.id)}>Complete</Button>}
							<Button onClick={() => handleDeleteTask(task.id)}>Delete</Button>
							<Button onClick={() => handleEditTask(task.id)}>Edit</Button>
							</LineDiv>
						)
						}
					</div>
				))}
		</div>
	);
});

export default ItemList;