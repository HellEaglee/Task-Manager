import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Workplace } from '../workplace/workplace.entity';
import { Board } from '../board/board.entity';
import { Card } from '../card/card.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Workplace)
    private readonly workplaceRepository: Repository<Workplace>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(userId: string): Promise<User> {
    return this.userRepository.findOneBy({ id: userId });
  }

  async findWorkplacesByUserId(creator_id: string): Promise<Workplace[]> {
    return this.workplaceRepository.find({
      where: { creator_id: { id: creator_id } },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const emailParts = createUserDto.email.split('@');
    if (emailParts.length > 0) {
      const name =
        emailParts[0].charAt(0).toUpperCase() + emailParts[0].slice(1);
      const user = this.userRepository.create({ name: name, ...createUserDto });
      const savedUser = await this.userRepository.save(user);

      const savedWorkplace = await this.workplaceRepository.save({
        name: `${savedUser.name}'s workplace`,
        creator_id: savedUser,
      });

      const savedBoard = await this.boardRepository.save({
        name: `${savedUser.name}'s board`,
        status: 0,
        workplace_id: savedWorkplace,
      });

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

      await this.cardRepository.save(defaultCards);

      return savedUser;
    }

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(userId: string, updateUserDto: CreateUserDto): Promise<User> {
    await this.userRepository.update(userId, updateUserDto);
    return this.findOne(userId);
  }

  async remove(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
