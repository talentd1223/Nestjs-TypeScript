import { CacheModule, Module } from '@nestjs/common';
import { OptimizeController } from './optimize.controller';
import { BullModule } from '@nestjs/bull';
import { ImageProcessor } from './image.processor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 60 * 60
      }),
    }),
  ],
  providers: [ImageProcessor],
  exports: [],
  controllers: [OptimizeController]
})
export class OptimizeModule {}
