import { Injectable } from '@nestjs/common';

@Injectable()
export class WechatService {
  async codeToSession(code: string): Promise<{ openid: string; sessionKey: string }> {
    return {
      openid: `openid_${Buffer.from(code).toString('hex').slice(0, 16)}`,
      sessionKey: `session_${Date.now()}`,
    };
  }

  async getPhoneByCode(phoneCode: string): Promise<string> {
    const tail = phoneCode.replace(/\D/g, '').slice(-4) || '0000';
    return `1380013${tail}`;
  }
}
