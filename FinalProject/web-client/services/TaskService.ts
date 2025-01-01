import {TaskModel} from '../models/TaskModel';
import {ITaskService} from './ITaskService';
import axios from 'axios';

const ipv4 : string = "localhost:3000"

export class TaskService implements ITaskService {
	async getTasks(): Promise<TaskModel[]> {
		try{
		const response = await axios.get(`http://`+ipv4+`/tasks`);
		return response.data;
		}catch(err : any){
			if (err.response) {
                alert(err.message + "\n" + err.response.data.error);
            } else {
                alert(err.message);
            }
		}
		return [];
	};

	async addTask(title: string, dueDate: Date | null): Promise<TaskModel> {
		try{
		const response = await axios.post(`http://`+ipv4+`/tasks/add`, new TaskModel("", title, dueDate, false));
		return response.data;
		}catch(err : any){
			if(err.request.status === 304){
				alert("Task needs a title to be created");
			}else if (err.response) {
                alert(err.message + "\n" + err.response.data.error);
            } else {
                alert(err.message);
            }
		}
		return {} as TaskModel;
	}

	async updateTask(id: string, title: string | null, dueDate: Date | null): Promise<TaskModel> {
		try{
		const response = await axios.put(`http://`+ipv4+`/tasks/${id}`, new TaskModel(id, title, dueDate, false));
		return response.data;
		}catch(err : any){
			if (err.response) {
                alert(err.message + "\n" + err.response.data.error);
            } else {
                alert(err.message);
            }
		}
		return {} as TaskModel;
	}

	async deleteTask(id: string): Promise<boolean> {
		try{
		const response = await axios.delete(`http://`+ipv4+`/tasks/${id}`);
		return response.status === 204;
		}catch(err : any){
			if (err.response) {
                alert(err.message + "\n" + err.response.data.error);
            } else {
                alert(err.message);
            }
		}
		return false;
	}

	async completeTask(id: string): Promise<TaskModel> {
		try{
		const response = await axios.put(`http://`+ipv4+`/tasks/${id}/complete`);
		return response.data;
		}catch(err : any){
			if (err.response) {
                alert(err.message + "\n" + err.response.data.error);
            } else {
                alert(err.message);
            }
		}
		return {} as TaskModel;
	}

	async uncompleteTask(id: string): Promise<TaskModel> {
		try{
		const response = await axios.put(`http://`+ipv4+`/tasks/${id}/uncomplete`);
		return response.data;
		}catch(err : any){
			if (err.response) {
                alert(err.message + "\n" + err.response.data.error);
            } else {
                alert(err.message);
            }
		}
		return {} as TaskModel;
	}
}