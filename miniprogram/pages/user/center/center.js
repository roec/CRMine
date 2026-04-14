const { getProfile } = require('../../../services/user');

const GENDER_TEXT = {
  male: '男',
  female: '女',
  other: '其他',
  undisclosed: '不方便透露',
};

const INCOME_TEXT = {
  below_5k: '5k 以下',
  '5k_10k': '5k - 10k',
  '10k_20k': '10k - 20k',
  '20k_30k': '20k - 30k',
  '30k_50k': '30k - 50k',
  above_50k: '50k 以上',
};

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
      this.setData({
        profile: {
          ...profile,
          genderLabel: GENDER_TEXT[profile.gender] || profile.gender,
          incomeLabel: INCOME_TEXT[profile.incomeRange] || '-',
        },
        maskedPhone: maskPhone(profile.phone),
      });
    } catch (_e) {
      wx.showToast({ title: '暂无资料', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },

  goEdit() {
    wx.navigateTo({ url: '/pages/profile/form/form' });
  },
});
