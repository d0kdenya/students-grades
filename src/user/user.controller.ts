import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { UserPayload } from './interfaces/user.payload.interface';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получить список учеников!' })
  @HttpCode(200)
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Создать ученика!' })
  @HttpCode(201)
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserPayload> {
    return await this.userService.createUser(dto);
  }
}
