import { join, resolve } from 'path';
import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { mkdir } from 'fs/promises';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
  fileName = '';
  fileSize = 100;
  logLevel = 3;

  constructor(private readonly configService: ConfigService) {
    super();

    this.logLevel = Number(configService.get('LOG_LEVEL'));
    this.fileSize = Number(configService.get('LOG_FILE_SIZE')) * 1024;
  }

  log(message: string, context?: string) {
    super.log.apply(this, [`\n${message}`, context]);
    this.writeLogToFile(message, 'log', context);
  }

  error(message: string, context?: string) {
    if (this.logLevel < 2) return;

    super.error.apply(this, [`\n${message}`, context]);
    this.writeLogToFile(message, 'error', context);
  }

  warn(message: string, context?: string) {
    if (this.logLevel < 3) return;

    super.warn.apply(this, [`\n${message}`, context]);
    this.writeLogToFile(message, 'warn', context);
  }

  debug(message: string, context?: string) {
    super.debug.apply(this, [`\n${message}`, context]);
  }

  verbose(message: string, context?: string) {
    super.verbose.apply(this, [`\n${message}`, context]);
  }

  private writeLogToFile = (
    message: string,
    type: string,
    context?: string,
  ): void => {
    const contextInfo = context
      ? '[' + context + ']'
      : this.context
      ? '[' + this.context + ']'
      : '';

    const amended = `\n${type.toUpperCase()} ${contextInfo} ${message}`;

    if (!this.fileName) {
      this.createFile(amended, this.context);
    } else {
      this.updateFile(amended, this.context);
    }
  };

  setFileName({ context }) {
    const type = context === 'LoggerMiddleware' ? 'logs' : 'errors';

    this.fileName = `${type}_${context}_${Date.now()}.log`;
  }

  async createFile(message: string, context: string, newFile = true) {
    if (!context) return;

    await mkdir(join(process.cwd(), 'logs'), { recursive: true });

    if (newFile) this.setFileName({ context });

    fs.appendFile(
      resolve('logs', this.fileName),
      `${message}`,
      'utf8',
      (err) => {
        if (err) throw err;
      },
    );
  }

  updateFile(message: string, context: string) {
    fs.stat(resolve('logs', this.fileName), (err, stat) => {
      if (err) {
        const message = `Fail to open file ${this.fileName}`;

        super.log.apply(this, [message, context]);
      } else {
        const newFile = stat.size > this.fileSize;

        this.createFile(message, context, newFile);
      }
    });
  }
}
