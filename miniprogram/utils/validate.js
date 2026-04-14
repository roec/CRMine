function isPhone(value) {
  return /^1\d{10}$/.test(String(value || ''));
}

function isRequired(value) {
  return String(value || '').trim().length > 0;
}

function validateProfile(payload) {
  if (!isPhone(payload.phone)) return '请先完成微信手机号授权';
  if (!isRequired(payload.realName)) return '请输入姓名';
  if (!isRequired(payload.gender)) return '请选择性别';
  if (!payload.age) return '请选择年龄';
  if (!payload.agreePolicy) return '请先勾选隐私政策';
  return '';
}

module.exports = { isPhone, isRequired, validateProfile };
