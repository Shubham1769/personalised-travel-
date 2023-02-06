import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { rateLimit } from 'express-rate-limit';
import { ExceptionFilter } from '../exceptions';
import { RequestGuard } from './guards';
import { ServerOptions } from './interfaces';
import { TimeoutInterceptor } from './timeoutInterceptor';

export class RestServer {
  private module: any;
  private options: ServerOptions;
  /**
   * Create instance of fastify lambda server
   * @returns Promise<INestApplication>
   */
  static async make(module: any, options?: ServerOptions): Promise<void> {
    const app = await NestFactory.create(module);
    const appConfig = app.get(ConfigService, { strict: false });

    // Not for eks only for the node process
    if (options?.addValidationContainer) {
      useContainer(app.select(module), { fallbackOnErrors: true });
    }

    options.globalPrefix && app.setGlobalPrefix(options.globalPrefix);
    app.use(rateLimit({ windowMs: 60, max: 50 }));
    app.enableCors({
      origin: [
        'http://localhost:3000',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'http://127.0.0.1:3000',
        'http://localhost:3001',
      ],
    });
    app.useGlobalGuards(new RequestGuard());
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionFilter(httpAdapter));
    app.useGlobalInterceptors(new TimeoutInterceptor());
    app.listen(options.port || appConfig.get<number>('app.port'));
  }
}
