import { Module, Global } from '@nestjs/common';
import { ResponseHandlerService } from './response-handler.service';

@Global() 
@Module({
  providers: [ResponseHandlerService],
  exports: [ResponseHandlerService], 
})
export class ResponseHandlerModule {}
