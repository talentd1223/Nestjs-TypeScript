import { FileInterceptor } from '@nestjs/platform-express';
import { Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

@Injectable()
class LocalFilesInterceptor implements NestInterceptor {
  fileInterceptor: NestInterceptor;
  constructor(configService: ConfigService) {
    const filesDestination = configService.get('UPLOADED_FILES_DESTINATION');

    const multerOptions: MulterOptions = {
      storage: diskStorage({
        destination: filesDestination
      })
    }

    this.fileInterceptor = new (FileInterceptor('file', multerOptions));
  }

  intercept(...args: Parameters<NestInterceptor['intercept']>) {
    return this.fileInterceptor.intercept(...args);
  }
}

export default LocalFilesInterceptor