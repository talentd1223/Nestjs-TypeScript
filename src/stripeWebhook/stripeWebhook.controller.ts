import { Controller, Post, Headers, Req } from '@nestjs/common';
import StripeService from '../stripe/stripe.service';
import RequestWithRawBody from './requestWithRawBody.interface';

@Controller('webhook')
export default class StripeWebhookController {
  constructor(
    private readonly stripeService: StripeService
  ) {}

  @Post()
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody
  ) {
    if (!signature) {
      throw new Error('Missing stripe-signature header');
    }

    const event = await this.stripeService.constructEventFromPayload(signature, request.rawBody);

    console.log(event);
  }
}
