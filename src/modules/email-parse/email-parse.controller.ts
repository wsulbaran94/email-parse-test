import { Controller, Get, Param } from '@nestjs/common';
import { EmailParseService } from './email-parse.service';

@Controller('email-parse')
export class EmailParseController {
  constructor(private readonly emailParseService: EmailParseService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailParseService.findOne(+id);
  }
}
