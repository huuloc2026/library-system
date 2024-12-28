

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(EmailofUser: any, codeId: string) {
    const url = `example.com/auth/confirm?token=${codeId}`;

    await this.mailerService.sendMail({
      to: EmailofUser,
      subject: 'Welcome to Nice Jake Library! Confirm your Email',
      template: './confirmation.hbs',
      context: {
        // ✏️ filling curly brackets with content
        name: EmailofUser,
        confirmationCode: codeId,
        confirmationLink: url,
        appName: 'Jake Library',
      },
    });
  }
}
