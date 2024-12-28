

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(EmailofUser: any, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: EmailofUser,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './template/confirm.hbs', 
      context: {
        // ✏️ filling curly brackets with content
        name: EmailofUser,
        url,
      },
    });
  }
}
