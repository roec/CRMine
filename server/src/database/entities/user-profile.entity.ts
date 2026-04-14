import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  UNDISCLOSED = 'undisclosed',
}

export enum IncomeRange {
  BELOW_5K = 'below_5k',
  RANGE_5K_10K = '5k_10k',
  RANGE_10K_20K = '10k_20k',
  RANGE_20K_30K = '20k_30k',
  RANGE_30K_50K = '30k_50k',
  ABOVE_50K = 'above_50k',
}

export enum ProfileStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

@Entity({ name: 'user_profiles' })
@Index(['openid'], { unique: true })
@Index(['phone'], { unique: true })
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 64 })
  openid: string;

  @Column({ length: 64, nullable: true })
  unionid?: string;

  @Column({ length: 64, nullable: true })
  nickname?: string;

  @Column({ length: 255, nullable: true })
  avatarUrl?: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 50 })
  realName: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'int' })
  age: number;

  @Column({ length: 20, nullable: true })
  ageRange?: string;

  @Column({ length: 100, nullable: true })
  job?: string;

  @Column({ type: 'enum', enum: IncomeRange, nullable: true })
  incomeRange?: IncomeRange;

  @Column({ length: 50, default: 'wechat_mini_program' })
  registerChannel: string;

  @Column({ length: 100, nullable: true })
  registerSource?: string;

  @Column({ type: 'enum', enum: ProfileStatus, default: ProfileStatus.ACTIVE })
  status: ProfileStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
