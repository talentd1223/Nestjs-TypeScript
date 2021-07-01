import { Module } from '@nestjs/common';
import StripeWebhookController from './stripeWebhook.controller';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [StripeModule],
  controllers: [StripeWebhookController],
  providers: [],
})
export class StripeWebhookModule {}
