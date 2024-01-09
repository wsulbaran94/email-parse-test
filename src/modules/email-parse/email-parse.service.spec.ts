import { Test, TestingModule } from '@nestjs/testing';
import { EmailParseService } from './email-parse.service';
import * as path from 'path';

describe('EmailParseService', () => {
  let service: EmailParseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailParseService],
    }).compile();

    service = module.get<EmailParseService>(EmailParseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('file not found', () => {
    service.getEmailJson('error').catch((error) => {
      expect(error).toBe('Email file not found');
    });
  });

  it('attachment file not empty', async () => {
    const rootFolderPath = path.resolve(__dirname, '../../../');
    const filePath = path.join(rootFolderPath, 'emails', 'email test.eml');
    await service.parseEmail(filePath).then((result) => {
      expect(result.attachments).toHaveLength(1);
    });
  });

  it('attachment link on body email is not empty', async () => {
    const rootFolderPath = path.resolve(__dirname, '../../../');
    const filePath = path.join(rootFolderPath, 'emails', 'email link.eml');
    await service.parseEmail(filePath).then((result) => {
      expect(result.text).toBeTruthy();
    });
  });

  it('attachment link on body email', async () => {
    const rootFolderPath = path.resolve(__dirname, '../../../');
    const filePath = path.join(rootFolderPath, 'emails', 'email link.eml');
    await service.parseEmail(filePath).then((result) => {
      const link = service.readEmail(result);
      expect(link).toBeTruthy();
    });
  });

  it('attachment json file', async () => {
    const rootFolderPath = path.resolve(__dirname, '../../../');
    const filePath = path.join(rootFolderPath, 'emails', 'email test.eml');
    await service.parseEmail(filePath).then((result) => {
      const jsonData = service.readEmail(result);
      expect(jsonData).not.toEqual({});
      expect(jsonData).not.toStrictEqual({});
      expect(jsonData).toBeTruthy();
    });
  });
});
