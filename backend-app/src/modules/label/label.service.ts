import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from './label.entity';
import { Repository } from 'typeorm';
import { Task } from '../task/task.entity';
import { CreateLabelDto } from './dto/create-label.dto';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Label[]> {
    return this.labelRepository.find();
  }

  findOne(labelId: string): Promise<Label> {
    return this.labelRepository.findOneBy({ id: labelId });
  }

  async create(createLabelDto: CreateLabelDto): Promise<Label> {
    const { title, color, task_id } = createLabelDto;

    const task = await this.taskRepository.findOne({ where: { id: task_id } });
    if (!task) {
      throw new Error(`Task with ID ${task_id} not found`);
    }

    const maxShortIdLabel = await this.labelRepository.findOne({
      where: { task_id: task },
      order: { shortId: 'DESC' },
    });

    const newShortId = maxShortIdLabel ? maxShortIdLabel.shortId + 1 : 1;

    const label = this.labelRepository.create({
      title,
      color,
      task_id: task,
      shortId: newShortId,
    });

    return this.labelRepository.save(label);
  }

  async update(
    labelId: string,
    updateLabelDto: CreateLabelDto,
  ): Promise<Label> {
    const { title, color, task_id } = updateLabelDto;

    const task = await this.taskRepository.findOne({ where: { id: task_id } });
    if (!task) {
      throw new Error(`Task with ID ${task_id} not found`);
    }

    await this.labelRepository.update(labelId, { title, color, task_id: task });

    return this.findOne(labelId);
  }

  async remove(labelId: string): Promise<void> {
    await this.labelRepository.delete(labelId);
  }
}
