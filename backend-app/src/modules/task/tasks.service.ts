import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Card } from '../card/card.entity';
import { Label } from '../label/label.entity';
import { Comment } from '../comment/comment.entity';

let currentShortId = 0;

function generateShortId(): number {
  return ++currentShortId;
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: ['card_id', 'labels', 'comments', 'comments.user_id'],
    });
  }

  async findOne(taskId: string): Promise<Task> {
    return this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['card_id', 'labels', 'comments', 'comments.user_id'],
    });
  }

  async findLabelsByTaskId(taskId: string): Promise<Label[]> {
    return this.labelRepository.find({ where: { task_id: { id: taskId } } });
  }

  async findCommentsByTaskId(taskId: string): Promise<Comment[]> {
    return this.commentRepository.find({ where: { task_id: { id: taskId } } });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { name, card_id } = createTaskDto;

    const card = await this.cardRepository.findOne({ where: { id: card_id } });
    if (!card) {
      throw new Error(`Card with ID ${card_id} not found`);
    }

    const task = this.taskRepository.create({
      name,
      card_id: card,
      shortId: generateShortId(),
    });

    return this.taskRepository.save(task);
  }

  async update(taskId: string, updateTaskDto: CreateTaskDto): Promise<Task> {
    const { name, card_id } = updateTaskDto;

    const card = await this.cardRepository.findOne({ where: { id: card_id } });
    if (!card) {
      throw new Error(`Card with ID ${card_id} not found`);
    }

    await this.taskRepository.update(taskId, {
      name,
      card_id: card,
    });

    return this.findOne(taskId);
  }

  async updateDescription(taskId: string, description: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    task.description = description;
    return await this.taskRepository.save(task);
  }

  async updateDue(taskId: string, due: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    task.due = due;
    return await this.taskRepository.save(task);
  }

  async changeCard(taskId: string, newCardId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    const card = await this.cardRepository.findOne({
      where: { id: newCardId },
    });
    if (!card) {
      throw new Error(`Card with ID ${newCardId} not found`);
    }

    task.card_id = card;
    return await this.taskRepository.save(task);
  }

  async remove(taskId: string): Promise<void> {
    await this.taskRepository.delete(taskId);
  }
}
