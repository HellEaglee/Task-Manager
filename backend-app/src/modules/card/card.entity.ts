import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../board/board.entity';
import { Task } from '../task/task.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer', nullable: false })
  shortId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToOne(() => Board, (board) => board.cards, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'board_id' })
  board_id: Board;

  @OneToMany(() => Task, (task) => task.card_id)
  tasks: Task[];
}
