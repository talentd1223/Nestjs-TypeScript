import { Injectable } from '@nestjs/common';
import EmailService from '../email/email.service';
import EmailScheduleDto from './dto/emailSchedule.dto';

@Injectable()
export default class EmailSchedulingService {
  constructor(
    private readonly emailService: EmailService
  ) {}

  scheduleEmail(emailSchedule: EmailScheduleDto) {
    return this.emailService.sendMail({
      to: emailSchedule.recipient,
      subject: emailSchedule.subject,
      text: emailSchedule.content
    })
  }
}
