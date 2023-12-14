import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateLessonDto {
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 100,
    example: 'Музыка',
    description: 'Название урока',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Название урока не должно быть пустым!' })
  @Transform(({ value }) => value.trim())
  @MinLength(3, { message: 'Название урока должно быть >= 3 символа' })
  @MaxLength(100, { message: 'Название урока должно быть <= 100 символов' })
  name: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 20,
    example: 'music',
    description: 'Код урока',
    required: true,
  })
  @IsNotEmpty({ message: 'Код урока не должен быть пустым!' })
  @Transform(({ value }) => value.trim())
  @MinLength(3, { message: 'Код урока должен быть >= 3 символа' })
  @MaxLength(20, { message: 'Код урока должен быть <= 30 символов' })
  code: string;
}
