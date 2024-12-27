import { Global, Injectable } from '@nestjs/common';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class ResponseHandlerService {
  // Phản hồi thành công
  success<T>(data: T, message: string = 'Request successful'): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  // Phản hồi lỗi
  error<T>(message: string, data: T = null): ApiResponse<T> {
    return {
      success: false,
      message,
      data,
    };
  }
}
