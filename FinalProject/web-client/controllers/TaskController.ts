import {makeAutoObservable} from 'mobx';
import {TaskModel} from '../models/TaskModel';
import {ITaskService} from '../services/ITaskService';

export class TaskController {
    taskService: ITaskService;

    constructor(service: ITaskService){
        this.taskService = service;
    }

    async fetchTasks() : Promise<TaskModel[]> {
        const response = await this.taskService.getTasks();
        if(!response || response.length === 0) return [];
        return response;
    }

    async addTask(title : string, dueDate : Date | null) : Promise<TaskModel> {
        const response = await this.taskService.addTask(title, dueDate);
        if(!response || Object.keys(response).length === 0) return {} as TaskModel;
        return response;
    }

    async updateTask(id: string, title: string | null, dueDate: Date | null) : Promise<TaskModel> {
        const response = await this.taskService.updateTask(id, title, dueDate);
        if(!response || Object.keys(response).length === 0) return {} as TaskModel;
        return response;
    }

    async deleteTask(id: string) : Promise<boolean> {
        const response = await this.taskService.deleteTask(id);
        if(!response) return false;
        return true;
    }

    async completeTask(id: string) : Promise<TaskModel> {
        const response = await this.taskService.completeTask(id);
        if(!response || Object.keys(response).length === 0) return {} as TaskModel;
        return response;
    }

    async uncompleteTask(id: string) : Promise<TaskModel> {
        const response = await this.taskService.uncompleteTask(id);
        if(!response || Object.keys(response).length === 0) return {} as TaskModel;
        return response;
    }
}