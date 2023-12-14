import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create.lesson.dto';
import { MakeLessonsEvaluationDto } from './dto/make.lessons.evaluation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { LessonEvaluationResult } from './interfaces/lesson.evaluation.result.interface';

@ApiTags('Lesson')
@UseGuards(JwtAuthGuard)
@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiOperation({ summary: 'Получить список уроков!' })
  @HttpCode(200)
  @Get()
  async getLessons(): Promise<Lesson[]> {
    return await this.lessonService.getLessons();
  }

  @ApiOperation({ summary: 'Создать урок!' })
  @HttpCode(201)
  @Post()
  async createLesson(@Body() dto: CreateLessonDto): Promise<Lesson> {
    return await this.lessonService.createLesson(dto);
  }

  @ApiOperation({ summary: 'Проставить оценку за урок!' })
  @HttpCode(201)
  @Post(':id/evaluations')
  async makeLessonsGrade(
    @Param('id') id: number,
    @Body() dto: MakeLessonsEvaluationDto,
  ): Promise<LessonEvaluationResult> {
    return await this.lessonService.makeLessonsGrade(id, dto);
  }
}
