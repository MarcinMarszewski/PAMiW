export class TaskModel {
	public id: string;
	public title: string | null;
	public dueDate: Date | null;
	public completed: boolean;
	
	constructor(id: string, title: string | null, dueDate: Date | null, completed: boolean) {
		this.id = id;
		this.title = title;
		this.dueDate = dueDate;
		this.completed = completed;
	}
  }