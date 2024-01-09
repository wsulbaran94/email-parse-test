import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as parser from 'mailparser';
@Injectable()
export class EmailParseService {
  async getEmailJson(filename: string) {
    try {
      const pathEmail = this.getPathEmail(filename);
      const parsedEmail = await this.parseEmail(pathEmail);
      return this.readEmail(parsedEmail);
    } catch (error) {
      throw error;
    }
  }

  getPathEmail(filename: string): string {
    const srcFolderPath = __dirname;
    const rootFolderPath = path.resolve(srcFolderPath, '../../../');
    const filePath = path.join(rootFolderPath, 'emails', filename);
    if (fs.existsSync(filePath)) {
      return filePath;
    } else {
      throw 'Email file not found';
    }
  }

  async parseEmail(filePath: string): Promise<any> {
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsedEmail = await parser.simpleParser(content);
    return parsedEmail;
  }

  readEmail(emailData) {
    const jsonAttachment = emailData.attachments.find(
      (attachment) => attachment.contentType === 'application/json',
    );

    if (jsonAttachment) {
      const jsonData = JSON.parse(jsonAttachment.content.toString());
      return { jsonData };
    } else {
      const bodyText = emailData.text || '';
      const linkMatch = bodyText.match(/(?:http|https):\/\/\S+\.json/);
      if (linkMatch) {
        const link = linkMatch[0];
        return { isLink: true, link };
      } else {
        throw 'JSON not found in the email';
      }
    }
  }
}
