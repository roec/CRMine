const { getToken } = require('../utils/storage');

const BASE_URL = 'http://localhost:3000/api';

/**
 * @template T
 * @param {{url:string,method?:'GET'|'POST'|'PUT',data?:Record<string, any>}} options
 * @returns {Promise<T>}
 */
function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        Authorization: getToken() ? `Bearer ${getToken()}` : '',
      },
      success: (res) => {
        const body = res.data || {};
        if (res.statusCode >= 200 && res.statusCode < 300 && body.success) {
          resolve(body.data);
          return;
        }
        reject(new Error((Array.isArray(body.message) ? body.message.join(',') : body.message) || 'Request failed'));
      },
      fail: reject,
    });
  });
}

module.exports = { request, BASE_URL };
