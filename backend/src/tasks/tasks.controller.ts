// src/tasks/tasks.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/user.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
        return this.tasksService.create(createTaskDto, user);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@GetUser() user: User) {
        return this.tasksService.findAll(user.id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
        @GetUser() user: User
    ) {
        return this.tasksService.update(+id, updateTaskDto, user.id);
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @GetUser() user: User
    ) {
        return this.tasksService.remove(+id, user.id);
    }
}