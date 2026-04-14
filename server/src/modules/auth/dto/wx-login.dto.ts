import { IsNotEmpty, IsString, Length } from 'class-validator';

export class WxLoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 200)
  code: string;
}
