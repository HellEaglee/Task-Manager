import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Workplace } from '../workplace/workplace.entity';
import { Board } from '../board/board.entity';
import { Card } from '../card/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Workplace, Board, Card])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
