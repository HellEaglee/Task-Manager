import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { Card } from '../card/card.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Get(':boardId')
  findOne(@Param('boardId') boardId: string): Promise<Board> {
    return this.boardsService.findOne(boardId);
  }

  @Get(':boardId/cards')
  findCards(@Param('boardId') cardId: string): Promise<Card[]> {
    return this.boardsService.findCardsByBoardId(cardId);
  }

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.create(createBoardDto);
  }

  @Put(':boardId')
  update(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: CreateBoardDto,
  ): Promise<Board> {
    return this.boardsService.update(boardId, updateBoardDto);
  }

  @Delete(':boardId')
  remove(@Param('boardId') boardId: string): Promise<void> {
    return this.boardsService.remove(boardId);
  }
}
