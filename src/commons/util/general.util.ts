const rTracer = require('cls-rtracer');
import { ConfigService } from '@nestjs/config';

export class GeneralUtils {
  constructor(private configService: ConfigService) {}

  public static get getCorrelationalId(): string {
    return rTracer.id() || '';
  }

  public static get getTraceId(): string {
    return rTracer.id() || '';
  }


  /**
   *
   * @param length
   * @returns
   */
  public static generateId(length: number, prefix?: string): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (prefix) result = prefix + result;
    return result;
  }
}
