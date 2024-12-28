import {makeAutoObservable} from 'mobx';
import {TaskModel} from '../models/TaskModel';
import {ITaskService} from '../services/ITaskService';

export class TaskViewModel {
	tasks: TaskModel[] = [];
	taskService: ITaskService;

	constructor(service: ITaskService){ 
		makeAutoObservable(this);
		this.taskService = service;
		this.fetchItems();
	}

	async fetchItems(){
		const response = await this.taskService.getTasks();
		if(!response || response.length === 0) return;
		this.tasks = response;
	}

	async addTask(title : string, dueDate : Date | null){
		const response = await this.taskService.addTask(title, dueDate);
		if(!response || Object.keys(response).length === 0) return;
		this.tasks.push(response);
	}

	async updateItem(id: string, title: string | null, dueDate: Date | null){
		const response = await this.taskService.updateTask(id, title, dueDate);
		if(!response || Object.keys(response).length === 0) return;
		const index = this.tasks.findIndex(task => task.id === response.id);
		this.tasks[index] = response;
	}

	async deleteTask(id: string){
		const response = await this.taskService.deleteTask(id);
		if(!response) return;
		this.tasks = this.tasks.filter(task => task.id !== id);
	}

	async completeTask(id: string){
		const response = await this.taskService.completeTask(id);
		if(!response || Object.keys(response).length === 0) return;
		const index = this.tasks.findIndex(task => task.id === response.id);
		this.tasks[index] = response;
	}

	async uncompleteTask(id: string){
		const response = await this.taskService.uncompleteTask(id);
		if(!response || Object.keys(response).length === 0) return;
		const index = this.tasks.findIndex(task => task.id === response.id);
		this.tasks[index] = response;
	}
}