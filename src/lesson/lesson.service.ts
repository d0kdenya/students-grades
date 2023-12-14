import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create.lesson.dto';
import { MakeLessonsEvaluationDto } from './dto/make.lessons.evaluation.dto';
import { Evaluation } from '../evaluation/entities/evaluation.entity';
import { LessonEvaluationResult } from './interfaces/lesson.evaluation.result.interface';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository
      .createQueryBuilder('l')
      .leftJoin('l.evaluations', 'e')
      .leftJoin('e.user', 'u')
      .addSelect([
        'l.id',
        'l.name',
        'l.code',
        'e.id',
        'e.score',
        'u.id',
        'u.name',
        'u.email',
      ])
      .getMany();
  }

  async createLesson(dto: CreateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonRepository.create(dto);
    return this.lessonRepository.save(lesson);
  }

  async makeLessonsGrade(
    id: number,
    dto: MakeLessonsEvaluationDto,
  ): Promise<LessonEvaluationResult> {
    const lesson = await this.lessonRepository.findOne({
      where: {
        id,
      },
      relations: ['evaluations'],
    });

    if (!lesson) {
      throw new NotFoundException('Урок не найден');
    }

    if (
      lesson.evaluations.length > 0 &&
      lesson.evaluations.some(
        (evaluation) =>
          evaluation.lessonId === Number(id) &&
          evaluation.userId === dto.userId,
      )
    ) {
      throw new BadRequestException(
        'Оценка ученика должна быть уникальна в рамках одного урока!',
      );
    }

    const evaluation = this.evaluationRepository.create({
      score: dto.score,
      createdAt: new Date(),
      userId: dto.userId,
      lesson: lesson,
    });

    const savedEvaluation = await this.evaluationRepository.save(evaluation);

    lesson.evaluations = [...(lesson.evaluations || []), savedEvaluation];

    await this.lessonRepository.save(lesson);

    return {
      id: savedEvaluation.id,
      userId: savedEvaluation.userId,
      score: savedEvaluation.score,
    };
  }
}
