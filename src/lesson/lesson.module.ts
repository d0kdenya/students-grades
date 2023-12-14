import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Evaluation } from '../evaluation/entities/evaluation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Evaluation])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
