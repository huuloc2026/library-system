import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

import { AuthController } from 'src/auth/auth.controller';

import { ConfigService } from '@nestjs/config';

import { AuthModule } from 'src/auth/auth.module';

import { UserModule } from 'src/user/user.module';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    UserModule,
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
        template: {
          dir: join(__dirname),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
