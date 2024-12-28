import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Workplace } from '../workplace/workplace.entity';
import { Card } from '../card/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Workplace, Card])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
