import { Request } from 'express';
import { UserEntity } from './../user/entities/user.entity';

export interface ExceptionResponse {
  statusCode: number;
  message: string | Array<string>;
}

export interface CustomHttpExeptionResponse extends ExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
}

export interface RequestInterface extends Request {
  user?: UserEntity;
}
