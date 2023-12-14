import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LessonModule } from './lesson/lesson.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Lesson } from './lesson/entities/lesson.entity';
import { Evaluation } from './evaluation/entities/evaluation.entity';
import { AuthModule } from './auth/auth.module';
import { Token } from './token/entities/token.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Lesson, Evaluation, Token],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    LessonModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
