import { Module, type NestModule, type MiddlewareConsumer } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller.js';
import { LoggerMiddleware } from './middleware/logger.middleware.js';
import { DatabaseService } from './database/database.service.js';
import { TasksService } from './tasks/tasks.service.js';
import { ConfigService } from './config/config.service.js';
import { AuthGuard } from './guards/auth.guard.js';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [
    ConfigService,
    DatabaseService,
    TasksService,
    AuthGuard,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
} 