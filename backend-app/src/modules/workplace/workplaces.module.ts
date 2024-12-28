import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workplace } from './workplace.entity';
import { WorkplacesController } from './workplaces.controller';
import { WorkplacesService } from './workplaces.service';
import { User } from '../user/user.entity';
import { Board } from '../board/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workplace, User, Board])],
  controllers: [WorkplacesController],
  providers: [WorkplacesService],
})
export class WorkplacesModule {}
