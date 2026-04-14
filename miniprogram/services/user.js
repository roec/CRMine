const { request } = require('./request');

function bindPhone(phoneCode) {
  return request({ url: '/user/bind-phone', method: 'POST', data: { phoneCode } });
}

function createProfile(payload) {
  return request({ url: '/user/profile', method: 'POST', data: payload });
}

function updateProfile(payload) {
  return request({ url: '/user/profile', method: 'PUT', data: payload });
}

function getProfile() {
  return request({ url: '/user/profile', method: 'GET' });
}

module.exports = { bindPhone, createProfile, updateProfile, getProfile };
