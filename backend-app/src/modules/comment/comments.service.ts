import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['user_id'] });
  }

  async findOne(commentId: string): Promise<Comment> {
    return this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user_id'],
    });
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { description, user_id, task_id } = createCommentDto;

    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new Error(`Task with ID ${user_id} not found`);
    }
    const task = await this.taskRepository.findOne({ where: { id: task_id } });
    if (!task) {
      throw new Error(`Task with ID ${task_id} not found`);
    }

    const maxShortIdComment = await this.commentRepository.findOne({
      where: { task_id: task },
      order: { shortId: 'DESC' },
    });

    const newShortId = maxShortIdComment ? maxShortIdComment.shortId + 1 : 1;

    const comment = this.commentRepository.create({
      description,
      timestamp: new Date(),
      user_id: user,
      task_id: task,
      shortId: newShortId,
    });

    return this.commentRepository.save(comment);
  }

  async update(
    commentId: string,
    updateCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const { description, user_id, task_id } = updateCommentDto;

    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new Error(`Task with ID ${user_id} not found`);
    }
    const task = await this.taskRepository.findOne({ where: { id: task_id } });
    if (!task) {
      throw new Error(`Task with ID ${task_id} not found`);
    }

    await this.commentRepository.update(commentId, {
      description,
      timestamp: new Date(),
      user_id: user,
      task_id: task,
    });

    return this.findOne(task_id);
  }

  async remove(commentId: string): Promise<void> {
    await this.commentRepository.delete(commentId);
  }
}
