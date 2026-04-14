function isPhone(value) {
  return /^1\d{10}$/.test(String(value || ''));
}

function isRequired(value) {
  return String(value || '').trim().length > 0;
}

function validateProfile(payload) {
  if (!isPhone(payload.phone)) return 'Please input a valid mobile number';
  if (!isRequired(payload.realName)) return 'Real name is required';
  if (!isRequired(payload.gender)) return 'Please select gender';
  if (!payload.age) return 'Please select age';
  if (!payload.agreePolicy) return 'Please agree to privacy policy';
  return '';
}

module.exports = { isPhone, isRequired, validateProfile };
