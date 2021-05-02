import {
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Param,
  Post, Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { Readable } from 'stream';

@Controller('optimize')
export class OptimizeController {
  constructor(
    @InjectQueue('image') private readonly imageQueue: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Post('image')
  @UseInterceptors(AnyFilesInterceptor())
  async addAvatar(@UploadedFiles() files: Express.Multer.File[]) {
    const job = await this.imageQueue.add('optimize', {
      files
    });

    return {
      jobId: job.id
    }
  }

  @Get('image/:id')
  async getJobResult(@Res() response: Response, @Param('id') id: string) {
    const jobResult = await this.cacheManager.get(id);

    if (jobResult) {
      const stream = Readable.from(jobResult.toBuffer());

      stream.pipe(response);
    }

    response.sendStatus(404);
  }
}
