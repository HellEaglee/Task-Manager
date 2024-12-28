import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WorkplacesService } from './workplaces.service';
import { Workplace } from './workplace.entity';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { Board } from '../board/board.entity';

@Controller('workplaces')
export class WorkplacesController {
  constructor(private readonly workplacesService: WorkplacesService) {}

  @Get()
  findAll(): Promise<Workplace[]> {
    return this.workplacesService.findAll();
  }

  @Get(':workplaceId')
  findOne(@Param('workplaceId') workplaceId: string): Promise<Workplace> {
    return this.workplacesService.findOne(workplaceId);
  }

  @Get(':workplaceId/boards')
  findBoards(@Param('workplaceId') boardId: string): Promise<Board[]> {
    return this.workplacesService.findBoardsByWorkplaceId(boardId);
  }

  @Post()
  async create(
    @Body() createWorkplaceDto: CreateWorkplaceDto,
  ): Promise<Workplace> {
    return this.workplacesService.create(createWorkplaceDto);
  }

  @Put(':workplaceId')
  update(
    @Param('workplaceId') workplaceId: string,
    @Body() updateWorkplaceDto: CreateWorkplaceDto,
  ): Promise<Workplace> {
    return this.workplacesService.update(workplaceId, updateWorkplaceDto);
  }

  @Delete(':workplaceId')
  remove(@Param('workplaceId') workplaceId: string): Promise<void> {
    return this.workplacesService.remove(workplaceId);
  }
}
