import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './label.entity';
import { Task } from '../task/task.entity';
import { LabelsController } from './label.controller';
import { LabelsService } from './label.service';

@Module({
  imports: [TypeOrmModule.forFeature([Label, Task])],
  controllers: [LabelsController],
  providers: [LabelsService],
})
export class LabelsModule {}
