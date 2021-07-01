import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';
import { json } from 'body-parser';
import { Response } from 'express';
import RequestWithRawBody from './stripeWebhook/requestWithRawBody.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });

  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true
  });

  app.use(json({
    verify: (request: RequestWithRawBody, response: Response, buffer: Buffer) => {
      if (request.headers['stripe-signature'] && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  }));

  await app.listen(3000);
}
bootstrap();
