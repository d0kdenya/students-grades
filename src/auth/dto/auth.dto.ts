import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 30,
    example: 'example@mail.ru',
    description: 'Почта ученика',
    required: true,
  })
  @IsEmail()
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
  @MinLength(3, { message: 'Пароль должен быть >= 3 символа' })
  @MaxLength(30, { message: 'Пароль должен быть <= 30 символов' })
  password: string;
}
