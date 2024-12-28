import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configservice: ConfigService) => ({
        transport: {
          host: configservice.get<string>('MAIL_HOST'),
          secure: true,
          port: configservice.get<number>('MAIL_PORT'),
          auth: {
            user: configservice.get<string>('MAIL_USER'),
            pass: configservice.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"nest-modules" <no-reply@nestjs.com>',
        },
        // template: {
        //   dir: __dirname + '/templates',
        //   adapter: new PugAdapter(),
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [MailService, AuthService],
  exports: [MailService],
})
export class MailModule {}
