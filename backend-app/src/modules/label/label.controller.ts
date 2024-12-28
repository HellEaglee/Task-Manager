import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LabelsService } from './label.service';
import { Label } from './label.entity';
import { CreateLabelDto } from './dto/create-label.dto';

@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get()
  findAll(): Promise<Label[]> {
    return this.labelsService.findAll();
  }

  @Get(':labelId')
  findOne(@Param('labelId') labelId: string): Promise<Label> {
    return this.labelsService.findOne(labelId);
  }

  @Post()
  async create(@Body() createLabelDto: CreateLabelDto): Promise<Label> {
    return this.labelsService.create(createLabelDto);
  }

  @Put(':labelId')
  update(
    @Param('labelId') labelId: string,
    @Body() updateLabelDto: CreateLabelDto,
  ): Promise<Label> {
    return this.labelsService.update(labelId, updateLabelDto);
  }

  @Delete(':labelId')
  remove(@Param('labelId') labelId: string): Promise<void> {
    return this.labelsService.remove(labelId);
  }
}
