export class Task {
    constructor(
      public id: string,
      public title: string,
      public dueDate: Date | null,
      public completed: boolean
    ) {}
  }