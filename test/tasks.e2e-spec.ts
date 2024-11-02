import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /tasks - deve criar uma nova tarefa', async () => {
    const task = { title: 'notificaotarefa', description: 'teste de tarefa' };
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(task)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toEqual(task.title);
    expect(response.body.description).toEqual(task.description);
  });

  it('GET /tasks - deve listar todas as tarefas', async () => {
    const response = await request(app.getHttpServer())
      .get('/tasks')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('PUT /tasks/:id - deve marcar uma tarefa como concluída', async () => {
    const taskId = 1;
    await request(app.getHttpServer())
      .put(`/tasks/${taskId}`)
      .expect(200);
  });

  it('DELETE /tasks/:id - deve excluir uma tarefa', async () => {
    const taskId = 1;
    await request(app.getHttpServer())
      .delete(`/tasks/${taskId}`)
      .expect(200);
  });
});
