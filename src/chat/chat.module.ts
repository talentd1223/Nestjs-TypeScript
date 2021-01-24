import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ChatService } from './chat.service';

@Module({
  imports: [AuthenticationModule],
  controllers: [],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
