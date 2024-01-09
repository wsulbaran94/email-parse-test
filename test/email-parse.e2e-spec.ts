import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailParseController } from '../src/modules/email-parse/email-parse.controller';
import { EmailParseService } from '../src/modules/email-parse/email-parse.service';
import * as request from 'supertest';

describe('Email parse E2E', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [EmailParseController],
      providers: [EmailParseService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET EMAIL PARSE', () => {
    it('email json file attachment', async () => {
      const filename = 'email test.eml';
      const response = await request(app.getHttpServer())
        .get(`/email-parse/${filename}`)
        .expect(200);

      expect(response).not.toEqual({});
      expect(response).not.toStrictEqual({});
      expect(response).toBeTruthy();
    });

    it('email link attachment on body', async () => {
      const filename = 'email link.eml';
      const response = await request(app.getHttpServer())
        .get(`/email-parse/${filename}`)
        .expect(302);

      expect(response.body).toBeTruthy();
    });

    it('email not fount', async () => {
      const filename = 'email testssss.eml';
      const response = await request(app.getHttpServer())
        .get(`/email-parse/${filename}`)
        .expect(404);
      expect(response.text).toBe('Email file not found');
    });
  });
});
