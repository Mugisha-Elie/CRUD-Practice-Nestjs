import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  constructor() {
    dotenv.config()
  }

  get(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Config error: key "${key}" is missing in .env`);
    }
    return value;
  }
}