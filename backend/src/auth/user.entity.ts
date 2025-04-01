import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Task } from '../tasks/tasks.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}