import { TaskDTO } from "../Infrastructure/DTOs/TaskDTO";
import { AppDataSource } from "../Infrastructure/data-source";
import { TaskEntity } from "../Infrastructure/Entities/TaskEntity";
import { Repository } from "typeorm";

export class TaskService {

    private taskRepository: Repository<TaskEntity>;

    constructor() {
        this.taskRepository = AppDataSource.getRepository(TaskEntity);
    }

    public async createTask(title: string, dueDate: Date | null): Promise<TaskEntity> {
        const taskEntity = new TaskEntity();
        taskEntity.title = title;
        taskEntity.dueDate = dueDate ? new Date(dueDate).toISOString() : null;
        taskEntity.completed = false;
        return await this.taskRepository.save(taskEntity);
    }

    public async getTasks(): Promise<TaskEntity[]> {
        return this.taskRepository.find();
    }

    public async updateTask(id: string, title?: string | null, dueDate?: Date | null, completed?: boolean | null): Promise<TaskEntity | null> {
        const task = await this.taskRepository.findOneBy({ id });
        if (task) {
            if (title) task.title = title;
            if (dueDate) task.dueDate = new Date(dueDate).toISOString();
            if (completed !== null && completed !== undefined) task.completed = completed
            return await this.taskRepository.save(task);
        }
        return null;
    }

    public async deleteTask(id: string): Promise<boolean> {
        const result = await this.taskRepository.delete(id);
        return result.affected !== 0;
    }
}