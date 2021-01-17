import { Injectable } from '@nestjs/common';
import EmailService from '../email/email.service';

@Injectable()
export default class EmailSchedulingService {
  constructor(
    private readonly emailService: EmailService
  ) {}
}
