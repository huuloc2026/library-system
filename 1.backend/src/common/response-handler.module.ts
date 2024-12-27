import { Module, Global } from '@nestjs/common';
import { ResponseHandlerService } from './response-handler.service';

@Global() // Đánh dấu module này là global
@Module({
  providers: [ResponseHandlerService],
  exports: [ResponseHandlerService], // Export ResponseHandlerService để có thể sử dụng ở các module khác
})
export class ResponseHandlerModule {}
