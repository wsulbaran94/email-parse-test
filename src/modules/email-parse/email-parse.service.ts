import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailParseService {
  findOne(id: number) {
    return `This action returns a #${id} emailParse`;
  }
}
