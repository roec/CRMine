const { ensureSession } = require('./services/auth');

App({
  globalData: {
    nickname: '',
    token: '',
    hasProfile: false,
  },

  async onLaunch() {
    try {
      const session = await ensureSession();
      this.globalData.token = session.token;
      this.globalData.hasProfile = session.hasProfile;
      this.globalData.nickname = session.nickname || '';
    } catch (error) {
      console.warn('Session init failed', error);
    }
  },
});
