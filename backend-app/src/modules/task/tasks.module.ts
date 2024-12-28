import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Card } from '../card/card.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Label } from '../label/label.entity';
import { Comment } from '../comment/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Card, Label, Comment])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
