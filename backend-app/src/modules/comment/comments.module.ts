import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Task, User])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
