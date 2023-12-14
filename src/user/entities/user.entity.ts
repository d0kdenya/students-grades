import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Token } from '../../token/entities/token.entity';
import { Evaluation } from '../../evaluation/entities/evaluation.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  password: string;

  @OneToOne(() => Token, (token) => token.user)
  token: Token;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.user)
  evaluations: Evaluation[];
}
