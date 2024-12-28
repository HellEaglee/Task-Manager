import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Board } from '../board/board.entity';
import { Task } from '../task/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Board, Task])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
