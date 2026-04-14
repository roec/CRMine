import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtUserPayload } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { BindPhoneDto } from './dto/bind-phone.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('bind-phone')
  bindPhone(@CurrentUser() user: JwtUserPayload, @Body() dto: BindPhoneDto) {
    return this.userService.bindPhone(user.openid, dto.phoneCode);
  }

  @Post('profile')
  createProfile(
    @CurrentUser() user: JwtUserPayload,
    @Body() dto: CreateProfileDto,
  ) {
    return this.userService.createProfile(user.openid, dto);
  }

  @Get('profile')
  getProfile(@CurrentUser() user: JwtUserPayload) {
    return this.userService.getProfile(user.openid);
  }

  @Put('profile')
  updateProfile(
    @CurrentUser() user: JwtUserPayload,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(user.openid, dto);
  }
}
