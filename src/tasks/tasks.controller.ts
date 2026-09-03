import { Controller, Get, Post, Body, UseGuards, UseInterceptors, BadRequestException } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard.js";
import { TransformInterceptor } from "../interceptors/transform.interceptor.js";
import { TaskValidationPipe } from "../pipes/task-validation.pipe.js";
import { CreateTaskDto } from "../dto/create-task.dto.js";
import { TasksService } from "./tasks.service.js";

@Controller('tasks')
@UseGuards(AuthGuard)  
@UseInterceptors(TransformInterceptor)  
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }
  
  @Get()
  getAllTasks() {
    return this.tasksService.getAll();
  }

  @Post()
  createTask(@Body(new TaskValidationPipe()) createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto)
  }
}