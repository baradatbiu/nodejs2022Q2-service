import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const linkToSwagger =
      '<br><a href="/doc" style="margin: 25px; font-size: 22px"><strong>Go to Swagger</strong></a>';

    return linkToSwagger;
  }
}
