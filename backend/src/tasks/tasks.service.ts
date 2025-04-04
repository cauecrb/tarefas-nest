/*import { Injectable } from '@nestjs/common';
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
} */

// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }

    async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const task = this.tasksRepository.create({
            ...createTaskDto,
            user,
        });
        return this.tasksRepository.save(task);
    }

    async findAll(userId: number): Promise<Task[]> {
        return this.tasksRepository.find({
            where: { user: { id: userId } },
        });
    }

    async update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task> {
        await this.tasksRepository.update(
            { id, user: { id: userId } },
            updateTaskDto
        );

        // Lança um erro se não encontrar
        return this.tasksRepository.findOneOrFail({
            where: { id }
        });
    }

    async remove(id: number, userId: number): Promise<void> {
        await this.tasksRepository.delete({ id, user: { id: userId } });
    }
}