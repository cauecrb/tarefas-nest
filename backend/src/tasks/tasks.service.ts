import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }

    async create(task: Partial<Task>, user: User): Promise<Task> {
        const newTask = this.tasksRepository.create({ ...task, user });
        return this.tasksRepository.save(newTask);
    }

    async findAll(user: User): Promise<Task[]> {
        return this.tasksRepository.find({ where: { user: { id: user.id } } });
    }

    // ... outros métodos (update, delete, etc)
}