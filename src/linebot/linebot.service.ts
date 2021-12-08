import { Injectable } from '@nestjs/common';
import '@line/bot-sdk';
@Injectable()
export class LinebotService {
  getHello(): string {
    return 'Hello World!';
  }
}
