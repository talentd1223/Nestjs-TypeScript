import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as AdmZip from 'adm-zip';
import { buffer } from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Processor('image')
export class ImageProcessor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
  }

  @Process('optimize')
  async handleTranscode(job: Job) {
    const files = job.data.files;

    const zip = new AdmZip();

    for(const file of files) {
      try {
        const fileBuffer = Buffer.from(file.buffer);
        const optimizedFile = await buffer(fileBuffer, {
          plugins: [
            imageminPngquant({
              quality: [0.6, 0.8]
            })
          ]
        })
        zip.addFile(file.originalname, optimizedFile);
      } catch (error) {
        console.log(error);
      }
    }

    const jobId = job.id;

    await this.cacheManager.set(String(jobId), zip, null);
  }
}