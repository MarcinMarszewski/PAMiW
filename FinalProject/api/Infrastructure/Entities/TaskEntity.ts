import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column({ nullable: true, type: "text" })
    dueDate!: string | null;

    @Column()
    completed!: boolean;
}