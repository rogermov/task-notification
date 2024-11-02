import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { Tasks } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private taskRepository: Repository<Tasks>,
    @InjectQueue('notification')
    private notificationQueue: Queue,
  ) {}

  create(createTaskDto: { title: string; description: string }): Promise<Tasks> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  findAll(): Promise<Tasks[]> {
    return this.taskRepository.find();
  }

  async markAsCompleted(id: number, email: string): Promise<Tasks> {
    const task = await this.taskRepository.findOneBy({ id });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  
    task.isCompleted = true;
    await this.taskRepository.save(task);
    await this.notificationQueue.add('sendNotification', {
      taskId: id,
      email,
    });
    return task;
  }

  remove(id: number): Promise<void> {
    return this.taskRepository.delete(id).then(() => undefined);
  }
}