import { Module } from '@nestjs/common';
import { EmailParseService } from './email-parse.service';
import { EmailParseController } from './email-parse.controller';

@Module({
  controllers: [EmailParseController],
  providers: [EmailParseService],
})
export class EmailParseModule {}
