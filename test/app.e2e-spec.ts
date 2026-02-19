import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Movies API (e2e)', () => {
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

  it('GET /api/movies -> 200 y estructura correcta', async () => {
    const res = await request(app.getHttpServer() as App).get('/api/movies');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const movies = res.body as { id: number; title: string }[];
    if (movies.length > 0) {
      expect(movies[0]).toHaveProperty('id');
      expect(movies[0]).toHaveProperty('title');
    }
  });
});
