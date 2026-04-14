const { getProfile } = require('../../services/user');

Page({
  data: {
    hasProfile: false,
  },

  async onShow() {
    try {
      await getProfile();
      this.setData({ hasProfile: true });
    } catch (_e) {
      this.setData({ hasProfile: false });
    }
  },

  goProfileForm() {
    wx.navigateTo({ url: '/pages/profile/form/form' });
  },

  goUserCenter() {
    wx.navigateTo({ url: '/pages/user/center/center' });
  },
});
