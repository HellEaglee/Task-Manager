import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Label } from '../label/label.entity';
import { Comment } from '../comment/comment.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':taskId')
  findOne(@Param('taskId') taskId: string): Promise<Task> {
    return this.tasksService.findOne(taskId);
  }

  @Get(':taskId/labels')
  findLabels(@Param('taskId') taskId: string): Promise<Label[]> {
    return this.tasksService.findLabelsByTaskId(taskId);
  }

  @Get(':taskId/comments')
  findComments(@Param('taskId') taskId: string): Promise<Comment[]> {
    return this.tasksService.findCommentsByTaskId(taskId);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':taskId')
  update(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(taskId, updateTaskDto);
  }

  @Put(':taskId/newDesc')
  async updateDesc(
    @Param('taskId') taskId: string,
    @Body('description') description: string,
  ): Promise<Task> {
    try {
      return await this.tasksService.updateDescription(taskId, description);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update task description',
        error,
      );
    }
  }

  @Put(':taskId/due')
  async updateDue(
    @Param('taskId') taskId: string,
    @Body('due') due: string,
  ): Promise<Task> {
    try {
      return await this.tasksService.updateDue(taskId, due);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update task due',
        error,
      );
    }
  }

  @Put(':taskId/moveCard/:newCardId')
  changeCard(
    @Param('taskId') taskId: string,
    @Param('newCardId') newCardId: string,
  ): Promise<Task> {
    return this.tasksService.changeCard(taskId, newCardId);
  }

  @Delete(':taskId')
  remove(@Param('taskId') taskId: string): Promise<void> {
    return this.tasksService.remove(taskId);
  }
}
