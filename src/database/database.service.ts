import { Injectable, type OnModuleInit, type OnModuleDestroy } from "@nestjs/common";
import pg from 'pg'
import { ConfigService } from "../config/config.service.js";

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: pg.Pool;

  constructor(private config: ConfigService) {
    this.pool = new pg.Pool({
      user: this.config.get('DB_USER'),
      host: this.config.get('DB_HOST'),
      database: this.config.get('DB_NAME'),
      password: this.config.get('DB_PASS'),
      port: parseInt(this.config.get('DB_PORT'), 10)
    });
  }

  async onModuleInit() {
    try {
      await this.pool.connect();
      console.log(`[Database] Connected to PostgreSQL`);

      await this.query(`
        CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `);
    } catch (err) {
      console.error('[Databaase] Connection Failed', err);
    }
  }

  async query(text: string, params?: any[]) {
    return this.pool.query(text, params)
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('[Database] Pool Closed');
  }
}