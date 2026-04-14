Page({
  goCenter() {
    wx.reLaunch({ url: '/pages/user/center/center' });
  },
  goHome() {
    wx.reLaunch({ url: '/pages/index/index' });
  },
});
