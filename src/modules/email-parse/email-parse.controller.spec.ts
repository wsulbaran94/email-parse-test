import { Test, TestingModule } from '@nestjs/testing';
import { EmailParseController } from './email-parse.controller';
import { EmailParseService } from './email-parse.service';

describe('EmailParseController', () => {
  let controller: EmailParseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailParseController],
      providers: [EmailParseService],
    }).compile();

    controller = module.get<EmailParseController>(EmailParseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
