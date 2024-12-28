import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MailModule } from 'src/mail/mail.module';

@Global()
@Module({
  imports:[],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
