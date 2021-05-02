import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as AdmZip from 'adm-zip';
import { buffer } from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';

@Processor('image')
export class ImageProcessor {
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

    return zip.toBuffer();
  }
}