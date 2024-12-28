import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workplace } from './workplace.entity';
import { Repository } from 'typeorm';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { User } from '../user/user.entity';
import { Board } from '../board/board.entity';

@Injectable()
export class WorkplacesService {
  constructor(
    @InjectRepository(Workplace)
    private readonly workplaceRepository: Repository<Workplace>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  findAll(): Promise<Workplace[]> {
    return this.workplaceRepository.find();
  }

  findOne(workplaceId: string): Promise<Workplace> {
    return this.workplaceRepository.findOneBy({ id: workplaceId });
  }

  async findBoardsByWorkplaceId(workplace_id: string): Promise<Board[]> {
    return this.boardRepository.find({
      where: { workplace_id: { id: workplace_id } },
      relations: ['workplace_id'],
    });
  }

  async create(createWorkplaceDto: CreateWorkplaceDto): Promise<Workplace> {
    const { name, creator_id } = createWorkplaceDto;

    console.log(`Looking for creator with ID: ${creator_id}`);
    const creator = await this.userRepository.findOne({
      where: { id: creator_id },
    });
    if (!creator) {
      console.error(`Creator with ID ${creator_id} not found`);
      throw new Error(`Creator with ID ${creator_id} not found`);
    }

    console.log(`Found creator:`, creator);
    const workplace = this.workplaceRepository.create({
      name,
      creator_id: creator,
    });

    const savedWorkplace = await this.workplaceRepository.save(workplace);

    await this.boardRepository.save({
      name: 'New Board',
      status: 0,
      workplace_id: savedWorkplace,
    });

    return savedWorkplace;
  }

  async update(
    workplaceId: string,
    updateWorkplaceDto: CreateWorkplaceDto,
  ): Promise<Workplace> {
    const { name, creator_id } = updateWorkplaceDto;

    const creator = await this.userRepository.findOne({
      where: { id: creator_id },
    });
    if (!creator) {
      throw new Error('User not found');
    }

    await this.workplaceRepository.update(workplaceId, {
      name,
      creator_id: creator,
    });
    return this.findOne(workplaceId);
  }

  async remove(workplaceId: string): Promise<void> {
    await this.workplaceRepository.delete(workplaceId);
  }
}
