import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import LocalFile from './localFile.entity';
import LocalFilesService from './localFiles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocalFile]),
    ConfigModule,
  ],
  providers: [LocalFilesService],
  exports: [LocalFilesService],
  controllers: []
})
export class LocalFilesModule {}
