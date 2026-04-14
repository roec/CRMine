import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../../database/entities/user-profile.entity';
import { WechatService } from '../auth/wechat.service';
import { RedisService } from '../redis/redis.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly profileRepo: Repository<UserProfile>,
    private readonly wechatService: WechatService,
    private readonly redisService: RedisService,
  ) {}

  async bindPhone(openid: string, phoneCode: string) {
    const phone = await this.wechatService.getPhoneByCode(phoneCode);
    await this.redisService.set(`wx:phone:${openid}`, phone, 600);
    return { phone };
  }

  async createProfile(openid: string, dto: CreateProfileDto) {
    const existing = await this.profileRepo.findOne({ where: { openid } });
    if (existing) {
      throw new BadRequestException('Profile already exists for this openid');
    }

    const phoneOwner = await this.profileRepo.findOne({ where: { phone: dto.phone } });
    if (phoneOwner) {
      throw new BadRequestException('Phone number already bound by another user');
    }

    const entity = this.profileRepo.create({
      ...dto,
      openid,
      registerChannel: 'wechat_mini_program',
    });
    return this.profileRepo.save(entity);
  }

  async getProfile(openid: string) {
    const profile = await this.profileRepo.findOne({ where: { openid } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async updateProfile(openid: string, dto: UpdateProfileDto) {
    const profile = await this.profileRepo.findOne({ where: { openid } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (dto.phone && dto.phone !== profile.phone) {
      const phoneOwner = await this.profileRepo.findOne({ where: { phone: dto.phone } });
      if (phoneOwner && phoneOwner.openid !== openid) {
        throw new BadRequestException('Phone number already bound by another user');
      }
    }

    Object.assign(profile, dto);
    return this.profileRepo.save(profile);
  }
}
