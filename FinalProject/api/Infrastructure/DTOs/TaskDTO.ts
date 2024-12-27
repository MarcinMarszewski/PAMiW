export class TaskDTO {
    constructor(public id: string | null, public title: string | null, public dueDate: Date | null, public completed : boolean | null) {}
}