import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 100,
    example: 'Джонни',
    description: 'Имя ученика',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Имя не должно быть пустым!' })
  @Transform(({ value }) => value.trim())
  @MinLength(3, { message: 'Имя должно быть >= 3 символа' })
  @MaxLength(100, { message: 'Имя должно быть <= 100 символов' })
  name: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 30,
    example: 'silverhand@cyber.punk',
    description: 'Почта ученика',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty({ message: 'Почта не должна быть пустым!' })
  @Transform(({ value }) => value.trim())
  @MinLength(3, { message: 'Почта должна быть >= 3 символа' })
  @MaxLength(30, { message: 'Почта должна быть <= 30 символов' })
  email: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 30,
    example: '123123',
    description: 'Пароль ученика',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Пароль не должен быть пустым!' })
  @Transform(({ value }) => value.trim())
  @MinLength(3, { message: 'Пароль должен быть >= 3 символа' })
  @MaxLength(30, { message: 'Пароль должен быть <= 30 символов' })
  password: string;
}
