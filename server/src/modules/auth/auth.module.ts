import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { WechatService } from './wechat.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserProfile } from '../../database/entities/user-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfile]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('app.jwtSecret'),
        signOptions: { expiresIn: config.get<string>('app.jwtExpiresIn', '7d') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, WechatService, JwtStrategy],
  exports: [WechatService],
})
export class AuthModule {}
