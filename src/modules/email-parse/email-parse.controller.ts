import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { EmailParseService } from './email-parse.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('email-parse')
@ApiTags('Email Parse')
export class EmailParseController {
  constructor(private readonly emailParseService: EmailParseService) {}

  @Get(':path')
  findOne(@Param('path') path: string, @Res() res: Response) {
    this.emailParseService
      .getEmailJson(path)
      .then((result) => {
        if (result.isLink) {
          res.redirect(result.link);
        } else {
          res.status(HttpStatus.OK).json(result.jsonData);
        }
      })
      .catch((error) => {
        res.status(HttpStatus.NOT_FOUND).send(error);
      });
  }
}
