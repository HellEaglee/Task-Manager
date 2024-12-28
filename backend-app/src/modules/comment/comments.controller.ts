import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':commentId')
  findOne(@Param('commentId') commentId: string): Promise<Comment> {
    return this.commentsService.findOne(commentId);
  }

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }

  @Put(':commentId')
  update(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.update(commentId, updateCommentDto);
  }

  @Delete(':commentId')
  remove(@Param('commentId') commentId: string): Promise<void> {
    return this.commentsService.remove(commentId);
  }
}
