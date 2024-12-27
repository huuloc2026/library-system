import { Global, Injectable } from '@nestjs/common';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class ResponseHandlerService {

  success<T>(data: T, message: string = 'Request successful'): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  error<T>(message: string, data: T = null): ApiResponse<T> {
    return {
      success: false,
      message,
      data,
    };
  }
}
