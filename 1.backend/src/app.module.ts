import { Module } from '@nestjs/common';


import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { ConfigModule } from '@nestjs/config';
import { ResponseHandlerModule } from './common/response-handler.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ResponseHandlerModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
