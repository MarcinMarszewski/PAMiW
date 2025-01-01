import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import { TaskModel } from '@/models/TaskModel';
import { TaskViewModel } from '@/viewmodels/TaskViewModel';
import LineDiv from './LineDiv';
import Text from './Text';
import Input from './Input';
import {DeleteButton, AddButton, CompleteButton, UncompleteButton, EditButton, UpdateButton} from './Buttons';

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
		if(newTaskTitle === '') return;
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
		if(editedTaskTitle === ''){
			setEditedTaskId('');
			setEditedTaskTitle('');
			setEditedTaskDueDate(null);
			return;
		}
		if(editedTaskDueDate === null) await viewModel.updateItem(editedTaskId, editedTaskTitle, editedTaskDueDate);
		else await viewModel.updateItem(editedTaskId, editedTaskTitle, new Date(editedTaskDueDate));
		setEditedTaskId('');
		setEditedTaskTitle('');
		setEditedTaskDueDate(null);
	}

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div>
				<h1 style={{marginLeft:'510px'}}>Add Task</h1>
					<LineDiv>
					<Input type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} />
					<Input type="date" value={newTaskDueDate !== null ? newTaskDueDate.toISOString().split('T')[0] : ''} onChange={e => setNewTaskDueDate(e.target.value ? new Date(e.target.value) : null)} />
					<AddButton onClick={handleAddTask}/>
					</LineDiv>
				<h1 style={{marginLeft:'510px'}}>Tasks</h1>
				</div>
			</div>
					<LineDiv style={{ height: '40px', backgroundColor: '#888', width: '1920px', justifyContent: 'center'}}>
					<Text style={{ width: '175px',}}>Title</Text>
					<Text style={{ width: '85px',}}>Due Date</Text>
					<Text style={{ width: '110px', textAlign:'center'}}>Actions</Text>
					</LineDiv>
				{viewModel.tasks.map((task : TaskModel) => (
					<div key={task.id}>
						{editedTaskId === task.id ?
						(
							<LineDiv style={{ width: '1920px', justifyContent: 'center'}}>
							<Input type="text" value={editedTaskTitle} onChange={e => setEditedTaskTitle(e.target.value)} />
							<Input type="date" value={editedTaskDueDate !== null ? editedTaskDueDate.toISOString().split('T')[0] : ''} onChange={e => setEditedTaskDueDate(e.target.value ? new Date(e.target.value) : null)} />
							<UpdateButton onClick={handleUpdateTask}/>
							</LineDiv>
						)
						:
						(
							<LineDiv style={{ backgroundColor: task.completed ? '#5f5' : '#f55' , width: '1920px', justifyContent: 'center'}}>
								<LineDiv>
								<Text style={{ width: '175px', wordBreak: 'break-word' }}>{task.title}</Text>
								<Text style={{width:'85px'}}>{task.dueDate?.toString().substring(0,10)}</Text>
								{/* <Text>{task.completed ? "Completed" : "Not Completed"}</Text> */}
								{task.completed ? <UncompleteButton onClick={() => handleUncompleteTask(task.id)}/> : <CompleteButton onClick={() => handleCompleteTask(task.id)}/>}
								<DeleteButton onClick={() => handleDeleteTask(task.id)}/>
								<EditButton onClick={() => handleEditTask(task.id)}/>
								</LineDiv>
							</LineDiv>
						)
						}
					</div>
				))}
		</div>
	);
});

export default ItemList;