import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from '../card/card.entity';
import { Label } from '../label/label.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer', nullable: false })
  shortId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  due: string;

  @ManyToOne(() => Card, (card) => card.tasks, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'card_id' })
  card_id: Card;

  @OneToMany(() => Label, (label) => label.task_id)
  labels: Label[];

  @OneToMany(() => Comment, (comment) => comment.task_id)
  comments: Comment[];
}
