import { Body, ClassSerializerInterceptor, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import CreateCommentDto from './dto/createComment.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCommentCommand } from './commands/implementations/createComment.command';

@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
export default class CommentsController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createComment(@Body() comment: CreateCommentDto, @Req() req: RequestWithUser) {
    const user = req.user;
    return this.commandBus.execute(
      new CreateCommentCommand(comment, user)
    )
  }
}