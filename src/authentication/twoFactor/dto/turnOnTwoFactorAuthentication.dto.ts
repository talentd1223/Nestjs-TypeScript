import { IsNotEmpty, IsString } from 'class-validator';

export class TurnOnTwoFactorAuthenticationDto {
  @IsString()
  @IsNotEmpty()
  twoFactorAuthenticationCode: string;
}