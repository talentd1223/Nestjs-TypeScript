import { UsersService } from './users.service';
import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { Express } from 'express';
import LocalFilesInterceptor from '../localFiles/localFiles.interceptor';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(LocalFilesInterceptor({
    fieldName: 'file',
    path: '/avatars'
  }))
  async addAvatar(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.addAvatar(request.user.id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype
    });
  }
}
