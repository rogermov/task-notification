import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: { title: string; description: string }) {
    try {
      return await this.tasksService.create(createTaskDto);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw new InternalServerErrorException('Erro ao criar tarefa.');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.tasksService.findAll();
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      throw new InternalServerErrorException('Erro ao buscar tarefas.');
    }
  }

  @Put(':id')
async markAsCompleted(@Param('id') id: number, @Body() body: { email: string }) {
  try {
    const task = await this.tasksService.markAsCompleted(id, body.email);
    return task;
  } catch (error) {
    console.error(`Erro ao marcar a tarefa com ID ${id} como concluída:`, error);
    throw new InternalServerErrorException('Erro ao marcar a tarefa como concluída.');
  }
}


  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.tasksService.remove(id);
      return { message: `Tarefa com ID ${id} removida com sucesso.` };
    } catch (error) {
      console.error(`Erro ao remover tarefa com ID ${id}:`, error);
      throw new InternalServerErrorException('Erro ao remover tarefa.');
    }
  }
}
