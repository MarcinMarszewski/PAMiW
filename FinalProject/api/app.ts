import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { TaskDTO } from "./Infrastructure/DTOs/TaskDTO";
import { TaskController } from "./Infrastructure/Controllers/TaskController";
import { Task } from "./Domain/Task";
import { TaskService } from "./Application/TaskService";
import { AppDataSource } from "./Infrastructure/data-source";

const app = express();
const port = 3000;

app.use(bodyParser.json());

    const taskService = new TaskService();
    const taskController = new TaskController(taskService);

    app.post("/tasks/add", async (req, res) => {
        const dto: TaskDTO = req.body;
        if(!dto.title) return res.status(400).json({ message: "Title is required" });
        const task = await taskController.createTask(dto.title, dto.dueDate);
        if (task) {
            const taskDTO = new TaskDTO(task.id, task.title, task.dueDate, task.completed);
            res.status(201).json(taskDTO);
        } else {
            res.status(400).json({ message: "Invalid task data" });
        }
    });

    app.get("/tasks", async (req: express.Request, res: express.Response) => {
        const tasks = await taskController.getTasks();
        const taskDTOs = tasks.map(task => new TaskDTO(task.id, task.title, task.dueDate, task.completed));
        res.status(200).json(taskDTOs);
    });

    app.put("/tasks/:id", async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        const dto: TaskDTO = req.body;
        const task = await taskController.updateTask(id, dto.title, dto.dueDate);
        if (task) {
            const taskDTO = new TaskDTO(task.id, task.title, task.dueDate, task.completed);
            res.status(200).json(taskDTO);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    });

    app.put("/tasks/:id/complete", async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        const task = await taskController.completeTask(id);
        if (task) {
            const taskDTO = new TaskDTO(task.id, task.title, task.dueDate, task.completed);
            res.status(200).json(taskDTO);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    });

    app.put("/tasks/:id/uncomplete", async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        const task = await taskController.uncompleteTask(id);
        if (task) {
            const taskDTO = new TaskDTO(task.id, task.title, task.dueDate, task.completed);
            res.status(200).json(taskDTO);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    });

    app.delete("/tasks/:id", async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        const success = await taskController.deleteTask(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

    app.on('error', (error: unknown) => console.log(error));
