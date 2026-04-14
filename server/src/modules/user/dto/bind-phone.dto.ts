import { IsNotEmpty, IsString, Length } from 'class-validator';

export class BindPhoneDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 255)
  phoneCode: string;
}
