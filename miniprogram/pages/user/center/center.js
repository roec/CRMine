const { getProfile } = require('../../../services/user');

function maskPhone(phone = '') {
  if (phone.length !== 11) return phone;
  return `${phone.slice(0, 3)}****${phone.slice(7)}`;
}

Page({
  data: {
    loading: true,
    profile: null,
    maskedPhone: '',
  },

  async onShow() {
    this.setData({ loading: true });
    try {
      const profile = await getProfile();
      this.setData({ profile, maskedPhone: maskPhone(profile.phone) });
    } catch (_e) {
      wx.showToast({ title: 'No profile found', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },

  goEdit() {
    wx.navigateTo({ url: '/pages/profile/form/form' });
  },
});
