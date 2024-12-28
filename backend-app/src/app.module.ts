import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/user/users.module';
import { BoardsModule } from './modules/board/boards.module';
import { WorkplacesModule } from './modules/workplace/workplaces.module';
import { CardsModule } from './modules/card/cards.module';
import { TasksModule } from './modules/task/tasks.module';
import { LabelsModule } from './modules/label/label.module';
import { CommentsModule } from './modules/comment/comments.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.POSTGRES_HOST}`,
      port: parseInt(process.env.POSTGRES_PORT),
      username: `${process.env.POSTGRES_USER}`,
      password: `${process.env.POSTGRES_PASSWORD}`,
      database: `${process.env.POSTGRES_DATABASE}`,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    WorkplacesModule,
    BoardsModule,
    CardsModule,
    TasksModule,
    LabelsModule,
    CommentsModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
