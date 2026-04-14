import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../../database/entities/user-profile.entity';
import { RedisService } from '../redis/redis.service';
import { WechatService } from './wechat.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly wechatService: WechatService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    @InjectRepository(UserProfile)
    private readonly profileRepo: Repository<UserProfile>,
  ) {}

  async wxLogin(code: string) {
    const { openid, sessionKey } = await this.wechatService.codeToSession(code);
    await this.redisService.set(`wx:session:${openid}`, sessionKey, 300);

    const hasProfile = Boolean(await this.profileRepo.findOne({ where: { openid } }));
    const token = await this.jwtService.signAsync({ sub: openid, openid });

    return { token, openid, hasProfile, expiresIn: this.configService.get('app.jwtExpiresIn') };
  }
}
