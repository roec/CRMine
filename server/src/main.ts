import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { existsSync, readFileSync } from 'fs';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';

async function bootstrap() {
  const enableHttps = process.env.ENABLE_HTTPS === 'true';
  const certPath = process.env.HTTPS_CERT_PATH;
  const keyPath = process.env.HTTPS_KEY_PATH;

  const httpsOptions =
    enableHttps && certPath && keyPath
      ? (() => {
          if (!existsSync(certPath) || !existsSync(keyPath)) {
            throw new Error(
              `HTTPS enabled but cert/key not found. cert=${certPath}, key=${keyPath}`,
            );
          }
          return {
            cert: readFileSync(certPath),
            key: readFileSync(keyPath),
          };
        })()
      : undefined;

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  const configService = app.get(ConfigService);
  const appPrefix = configService.get<string>('app.prefix', 'api');
  const port = configService.get<number>('app.port', 3000);

  app.setGlobalPrefix(appPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.enableCors();

  await app.listen(port);
}

bootstrap();
