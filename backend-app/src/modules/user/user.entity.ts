import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Workplace } from '../workplace/workplace.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @OneToMany(() => Workplace, (workplace) => workplace.creator_id)
  workplaces: Workplace[];

  @OneToMany(() => Comment, (comment) => comment.user_id)
  comments: Comment[];
}
