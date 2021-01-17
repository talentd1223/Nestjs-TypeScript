import { Module } from '@nestjs/common';
import EmailSchedulingService from './emailScheduling.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [],
  providers: [EmailSchedulingService],
})
export class EmailSchedulingModule {}
