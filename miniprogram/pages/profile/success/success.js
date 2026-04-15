Page({
  goCenter() {
    wx.reLaunch({ url: '/pages/user/center/center' });
  },
  goForm() {
    wx.reLaunch({ url: '/pages/profile/form/form' });
  },
});
