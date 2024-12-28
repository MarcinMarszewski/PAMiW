import { TaskService } from "../../Application/TaskService";
import { Task } from "../../Domain/Task";

export class TaskController {
    constructor (private taskService: TaskService) {}

    public async createTask(title: string, dueDate: Date | null): Promise<Task | null>{
        const task = await this.taskService.createTask(title, dueDate);
        if(task) return new Task(task.id, task.title, task.dueDate ? new Date(task.dueDate) : null, task.completed);
        return null;
    }

    public async getTasks(): Promise<Task[]> {
        return (await this.taskService.getTasks()).map(task => new Task(task.id, task.title, task.dueDate ? new Date(task.dueDate) : null, task.completed));
    }

    public async updateTask(id: string, title: string | null, dueDate: Date | null): Promise<Task | null> {
        const task = await this.taskService.updateTask(id, title, dueDate);
        if(task) return new Task(task.id, task.title, task.dueDate ? new Date(task.dueDate) : null, task.completed);
        return null;
    }

    public async completeTask(id: string): Promise<Task | null> {
        const task = await this.taskService.changeTaskStatus(id, true);
        if(task) return new Task(task.id, task.title, task.dueDate ? new Date(task.dueDate) : null, task.completed);
        return null;
    }

    public async uncompleteTask(id: string): Promise<Task | null> {
        const task = await this.taskService.changeTaskStatus(id, false);
        if(task) return new Task(task.id, task.title, task.dueDate ? new Date(task.dueDate) : null, task.completed);
        return null;
    }

    public async deleteTask(id: string): Promise<boolean> {
        const task = await this.taskService.deleteTask(id);
        return task;
    }
}