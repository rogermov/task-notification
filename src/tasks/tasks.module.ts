import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasks]),
    BullModule.registerQueue({
      name: 'notification',
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      },
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
