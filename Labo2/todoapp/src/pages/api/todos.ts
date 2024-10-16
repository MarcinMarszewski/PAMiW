// pages/api/todos.ts
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

let taskId = 0;

export default withIronSessionApiRoute(todoHandler, sessionOptions);

async function todoHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (!req.session.todos) {
    req.session.todos = [];
  }

  switch (method) {
    case "GET":
      res.status(200).json(req.session.todos);
      break;
    case "POST":
      const newTask = {
        id: taskId++,
        text: body.text,
        completed: false,
      };
      req.session.todos.push(newTask);
      await req.session.save();
      res.status(201).json(newTask);
      break;
    case "PATCH":
      const { id, completed } = body;
      const task = req.session.todos.find(todo => todo.id === id);
      if (task) {
        task.completed = completed;
        await req.session.save();
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
      break;
    case "DELETE":
      const taskIdToDelete = body.id;
      req.session.todos = req.session.todos.filter(todo => todo.id !== taskIdToDelete);
      await req.session.save();
      res.status(204).end();
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
