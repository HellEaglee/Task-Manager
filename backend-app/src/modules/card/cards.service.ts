import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { Board } from '../board/board.entity';
import { Task } from '../task/task.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Card[]> {
    return this.cardRepository.find({ relations: ['board_id'] });
  }

  findOne(cardId: string): Promise<Card> {
    return this.cardRepository.findOne({
      where: { id: cardId },
      relations: ['board_id'],
    });
  }

  async findTasksByCardId(cardId: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { card_id: { id: cardId } },
      relations: ['card_id', 'labels', 'comments', 'comments.user_id'],
    });
  }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const { name, board_id } = createCardDto;

    const board = await this.boardRepository.findOne({
      where: { id: board_id },
    });

    if (!board) {
      throw new Error(`Board with ID ${board_id} not found`);
    }

    const maxShortIdCard = await this.cardRepository.findOne({
      where: { board_id: board },
      order: { shortId: 'DESC' },
    });

    const newShortId = maxShortIdCard ? maxShortIdCard.shortId + 1 : 1;

    const card = this.cardRepository.create({
      name,
      board_id: board,
      shortId: newShortId,
    });
    return this.cardRepository.save(card);
  }

  async update(cardId: string, updateCardDto: CreateCardDto): Promise<Card> {
    const { name, board_id } = updateCardDto;

    const board = await this.boardRepository.findOne({
      where: { id: board_id },
    });

    if (!board) {
      throw new Error(`Board with ID ${board_id} not found`);
    }

    await this.cardRepository.update(cardId, { name, board_id: board });
    return this.findOne(cardId);
  }

  async remove(cardId: string): Promise<void> {
    await this.cardRepository.delete(cardId);
  }
}
