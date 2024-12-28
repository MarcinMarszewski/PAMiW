import { TaskModel } from "../models/TaskModel";

export interface ITaskService {
	getTasks(): Promise<TaskModel[]>;
	addTask(title: string, dueDate: Date | null): Promise<TaskModel>;
	updateTask(id: string, title: string | null, dueDate: Date | null): Promise<TaskModel>;
	deleteTask(id: string): Promise<boolean>;
	completeTask(id: string): Promise<TaskModel>;
	uncompleteTask(id: string): Promise<TaskModel>;
}