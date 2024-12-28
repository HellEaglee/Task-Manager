import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Board } from '../board/board.entity';

@Entity()
export class Workplace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToOne(() => User, (user) => user.workplaces, {
    nullable: false,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'creator_id' })
  creator_id: User;

  @OneToMany(() => Board, (board) => board.workplace_id)
  boards: Board[];
}
