import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailParseModule } from './modules/email-parse/email-parse.module';

@Module({
  imports: [EmailParseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
