import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MakeLessonsEvaluationDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'ID ученика',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'ID ученика не должно быть пустым!' })
  userId: number;

  @ApiProperty({
    type: Number,
    example: 56,
    description: 'Оценка урока',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Оценка урока не должна быть пустым!' })
  score: number;
}
