import { CustomLogger } from './custom-logger.service';
import { CustomHttpExeptionResponse } from './custom-exception.interface';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly customLoggerService: CustomLogger) {
    this.customLoggerService.setContext(CustomExceptionFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const getOptions = () => {
      if (exception instanceof HttpException) {
        return {
          status: exception.getStatus(),
          message: exception.getResponse()['message'],
        };
      }

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Critical internal server error occurred!',
      };
    };

    const { status, message } = getOptions();

    const errorResponse = this.getErrorResponse(status, message, request);
    const errorLog = this.getErrorLog(errorResponse, request, exception);

    this.customLoggerService.error(errorLog, CustomExceptionFilter.name);

    response.status(status).json(errorResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ) => ({
    statusCode: status,
    message: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  private getErrorLog = (
    errorResponse: CustomHttpExeptionResponse,
    request: Request,
    exception: unknown,
  ): string => {
    const { statusCode, message } = errorResponse;
    const { method, url } = request;

    const errorLog = `
      Response Code: ${statusCode} - Method: ${method} - URL: ${url}
      Body - ${JSON.stringify(request.body)}
      ${JSON.stringify(errorResponse)}
      User: ${JSON.stringify(request.user ?? 'Not signed in')}
      Stack trace - ${
        exception instanceof HttpException ? exception.stack : message
      }
    `;

    return errorLog;
  };
}
