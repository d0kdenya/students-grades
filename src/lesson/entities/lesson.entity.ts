import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Evaluation } from '../../evaluation/entities/evaluation.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  code: string;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.lesson)
  evaluations: Evaluation[];
}
