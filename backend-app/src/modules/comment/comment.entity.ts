import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer', nullable: false })
  shortId: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @ManyToOne(() => Task, (task) => task.comments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task_id: Task;

  @ManyToOne(() => User, (user) => user.comments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id: User;
}
