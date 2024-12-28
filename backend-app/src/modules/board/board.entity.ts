import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workplace } from '../workplace/workplace.entity';
import { Card } from '../card/card.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'int', nullable: true })
  status: number;

  @ManyToOne(() => Workplace, (workplace) => workplace.boards, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workplace_id' })
  workplace_id: Workplace;

  @OneToMany(() => Card, (card) => card.board_id)
  cards: Card[];
}
