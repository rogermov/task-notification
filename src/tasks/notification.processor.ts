import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('notification')
export class NotificationProcessor {
  @Process('sendNotification')
  async handleNotification(job: Job) {
    console.log(`Notificação: A tarefa ${job.data.taskId} foi concluída e notificada para ${job.data.email}`);
  }
}
