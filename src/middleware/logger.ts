import { RequestInterface } from './../logger/custom-exception.interface';
import { CustomLogger } from './../logger/custom-logger.service';
import { ConfigService } from '@nestjs/config';
import { Response, NextFunction } from 'express';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private customLoggerService: CustomLogger;

  constructor(private configService: ConfigService) {
    this.customLoggerService = new CustomLogger(this.configService);
    this.customLoggerService.setContext(LoggerMiddleware.name);
  }

  use(request: RequestInterface, response: Response, next: NextFunction): void {
    const { method, body, params, originalUrl, query, ip } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      if (statusCode >= HttpStatus.BAD_REQUEST) return;

      const log = `
        \nResponse Code: ${statusCode} - Method: ${method} - URL: ${originalUrl} - IP: ${ip}
        Body - ${JSON.stringify(body)}
        Params: ${JSON.stringify(params)}
        Query params: ${JSON.stringify(query)}
      `;

      this.customLoggerService.log(log, LoggerMiddleware.name);
    });

    next();
  }
}
