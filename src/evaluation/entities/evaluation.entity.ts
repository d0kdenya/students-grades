import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Lesson } from '../../lesson/entities/lesson.entity';
import { User } from '../../user/entities/user.entity';

@Entity('evaluations')
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  score: number;

  @Column({ type: 'timestamptz', nullable: false })
  createdAt: Date;

  @Column({ type: 'integer', nullable: false })
  lessonId: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.evaluations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  lesson: Lesson;

  @Column({ type: 'integer', nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.evaluations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
