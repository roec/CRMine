import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Gender, IncomeRange } from '../../../database/entities/user-profile.entity';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('CN')
  phone: string;

  @IsString()
  @IsNotEmpty()
  realName: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsInt()
  @Min(1)
  @Max(120)
  age: number;

  @IsOptional()
  @IsString()
  job?: string;

  @IsOptional()
  @IsEnum(IncomeRange)
  incomeRange?: IncomeRange;
}
