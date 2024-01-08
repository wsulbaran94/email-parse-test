import { PartialType } from '@nestjs/swagger';
import { CreateEmailParseDto } from './create-email-parse.dto';

export class UpdateEmailParseDto extends PartialType(CreateEmailParseDto) {}
