import { Module } from '@nestjs/common';
import StripeWebhookController from './stripeWebhook.controller';
import { StripeModule } from '../stripe/stripe.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [StripeModule, UsersModule],
  controllers: [StripeWebhookController],
  providers: [],
})
export class StripeWebhookModule {}
