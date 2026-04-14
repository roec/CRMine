const { request } = require('./request');
const { getToken, setToken } = require('../utils/storage');

async function wxLogin(code) {
  return request({ url: '/auth/wx-login', method: 'POST', data: { code } });
}

function loginByWx() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: async ({ code }) => {
        if (!code) {
          reject(new Error('No wx login code'));
          return;
        }
        try {
          const data = await wxLogin(code);
          setToken(data.token);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      },
      fail: reject,
    });
  });
}

async function ensureSession() {
  const token = getToken();
  if (token) return { token, hasProfile: false };
  return loginByWx();
}

module.exports = { ensureSession, loginByWx };
