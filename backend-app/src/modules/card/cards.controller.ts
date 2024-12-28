import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { Task } from '../task/task.entity';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  findAll(): Promise<Card[]> {
    return this.cardsService.findAll();
  }

  @Get(':cardId')
  findOne(@Param('cardId') cardId: string): Promise<Card> {
    return this.cardsService.findOne(cardId);
  }

  @Get(':cardId/tasks')
  findTasks(@Param('cardId') cardId: string): Promise<Task[]> {
    return this.cardsService.findTasksByCardId(cardId);
  }

  @Post()
  async create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsService.create(createCardDto);
  }

  @Put(':cardId')
  update(
    @Param('cardId') cardId: string,
    @Body() updateCardDto: CreateCardDto,
  ): Promise<Card> {
    return this.cardsService.update(cardId, updateCardDto);
  }

  @Delete(':cardId')
  remove(@Param('cardId') cardId: string): Promise<void> {
    return this.cardsService.remove(cardId);
  }
}
