import {useEffect, useState} from 'react';
import { TaskModel } from '@/models/TaskModel';
import { TaskController } from '@/controllers/TaskController';
import LineDiv from './LineDiv';
import Text from './Text';
import Input from './Input';
import {DeleteButton, AddButton, CompleteButton, UncompleteButton, EditButton, UpdateButton} from './Buttons';

interface ItemListProps {
	controller: TaskController;  
}

const ItemList: React.FC<ItemListProps> = ({ controller }) => {
	const [tasks, setTasks] = useState<TaskModel[]>([]);
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [newTaskDueDate, setNewTaskDueDate] = useState<Date | null>(null);
	const [editedTaskId, setEditedTaskId] = useState('');
	const [editedTaskTitle, setEditedTaskTitle] = useState('');
	const [editedTaskDueDate, setEditedTaskDueDate] = useState<Date | null>(null);

	useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await controller.fetchTasks();
            setTasks(tasks);
        };
        fetchTasks();
    }, [controller]);

	const handleAddTask = async () => {
		if(newTaskTitle === '') return;
		if(newTaskDueDate === null) {
			const newTask = await controller.addTask(newTaskTitle, newTaskDueDate);
			setTasks(prevTasks => [...prevTasks, newTask]);
		} else {
			const newTask = await controller.addTask(newTaskTitle, new Date(newTaskDueDate));
			setTasks(prevTasks => [...prevTasks, newTask]);
		}
	}

	const handleCompleteTask = async (id: string) => {
        const returnedTask = await controller.completeTask(id);
		if(!returnedTask) return;

        const updatedTasks = tasks.map(task => task.id === id ? returnedTask : task);
        setTasks(updatedTasks);
    };

	const handleUncompleteTask = async (id: string) => {
        const returnedTask = await controller.uncompleteTask(id);
		if(!returnedTask) return;

        const updatedTasks = tasks.map(task => task.id === id ? returnedTask : task);
        setTasks(updatedTasks);
    };

	const handleDeleteTask = async (id: string) => {
        const isDeleted = await controller.deleteTask(id);
		if(!isDeleted) return;
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    };

	const handleEditTask = async (id: string) => {
		const task = tasks.find(task => task.id === id);
		if(task){
			setEditedTaskId(task.id);
			setEditedTaskTitle(task.title || '');
			setEditedTaskDueDate(task.dueDate ? new Date(task.dueDate) : null);
		}
	}

	const handleUpdateTask = async () => {
        const updatedTask = await controller.updateTask(editedTaskId, editedTaskTitle, editedTaskDueDate);
		if(!updatedTask) return;
        const updatedTasks = tasks.map(task => task.id === editedTaskId ? updatedTask : task);
        setTasks(updatedTasks);
		setEditedTaskId('');
		setEditedTaskTitle('');
		setEditedTaskDueDate(null);
    };

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div>
				<h1 style={{marginLeft:'500px'}}>Add Task</h1>
				<LineDiv>
				<Input type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} />
				<Input type="date" value={newTaskDueDate !== null ? newTaskDueDate.toISOString().split('T')[0] : ''} onChange={e => setNewTaskDueDate(e.target.value ? new Date(e.target.value) : null)} />
				<AddButton onClick={handleAddTask}/>
				</LineDiv>
				<h1 style={{marginLeft:'0px'}}>Tasks</h1>
				</div>
			</div>
					<LineDiv style={{ height: '40px', backgroundColor: '#888', width: '1920px', justifyContent: 'center'}}>
					<Text style={{ width: '300px',}}>Title</Text>
					<Text>Due Date</Text>
					<Text>Status</Text>
					<Text style={{ width: '290px', textAlign:'center'}}>Actions</Text>
					</LineDiv>
				{tasks.map((task : TaskModel) => (
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
								<Text style={{ width: '300px'}}>{task.title}</Text>
								<Text>{task.dueDate?.toString().substring(0,10)}</Text>
								<Text>{task.completed ? "Completed" : "Not Completed"}</Text>
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
};

export default ItemList;