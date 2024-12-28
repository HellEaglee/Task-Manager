import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Workplace } from '../workplace/workplace.entity';
import { Card } from '../card/card.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Workplace)
    private readonly workplaceRepository: Repository<Workplace>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  findAll(): Promise<Board[]> {
    return this.boardRepository.find({ relations: ['workplace_id'] });
  }

  findOne(boardId: string): Promise<Board> {
    return this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['workplace_id'],
    });
  }

  async findCardsByBoardId(boardId: string): Promise<Card[]> {
    return this.cardRepository.find({
      where: { board_id: { id: boardId } },
      relations: ['board_id'],
    });
  }

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const { name, status, workplace_id } = createBoardDto;

    const workplace = await this.workplaceRepository.findOne({
      where: { id: workplace_id },
    });
    if (!workplace) {
      throw new Error(`Workplace with ID ${workplace_id} not found`);
    }

    const board = this.boardRepository.create({
      name,
      status: status || 0,
      workplace_id: workplace,
    });
    const savedBoard = await this.boardRepository.save(board);

    const maxShortIdCard = await this.cardRepository.findOne({
      where: { board_id: savedBoard },
      order: { shortId: 'DESC' },
    });

    const newShortId = maxShortIdCard ? maxShortIdCard.shortId + 1 : 1;

    const defaultCards = [
      { name: 'To do', board_id: savedBoard, shortId: newShortId },
      { name: 'In progress', board_id: savedBoard, shortId: newShortId + 1 },
      { name: 'Done', board_id: savedBoard, shortId: newShortId + 2 },
    ];

    try {
      await this.cardRepository.save(defaultCards);
      console.log('Default cards saved successfully.');
    } catch (error) {
      console.error('Error saving default cards:', error.message);
      throw new Error(`Failed to create default cards: ${error.message}`);
    }

    return savedBoard;
  }

  async update(
    boardId: string,
    updateBoardDto: CreateBoardDto,
  ): Promise<Board> {
    const { name, status, workplace_id } = updateBoardDto;

    const workplace = await this.workplaceRepository.findOne({
      where: { id: workplace_id },
    });
    if (!workplace) {
      throw new Error(`Workplace with ID ${workplace_id} not found`);
    }

    try {
      await this.boardRepository.update(boardId, {
        name,
        status,
        workplace_id: workplace,
      });
      return this.findOne(boardId);
    } catch (error) {
      console.error('Error updating board:', error);
      throw new Error(`Failed to update board: ${error.message}`);
    }
  }

  async remove(boardId: string): Promise<void> {
    await this.boardRepository.delete(boardId);
  }
}
