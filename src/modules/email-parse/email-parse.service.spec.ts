import { Test, TestingModule } from '@nestjs/testing';
import { EmailParseService } from './email-parse.service';

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
});
