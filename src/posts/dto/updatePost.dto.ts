import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePostDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}

export default UpdatePostDto;