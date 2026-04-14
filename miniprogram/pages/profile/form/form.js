const { GENDER_OPTIONS, INCOME_OPTIONS, AGE_OPTIONS } = require('../../../constants/options');
const { bindPhone, createProfile, getProfile, updateProfile } = require('../../../services/user');
const { validateProfile } = require('../../../utils/validate');

Page({
  data: {
    loading: false,
    submitDisabled: true,
    isEdit: false,
    form: {
      phone: '',
      realName: '',
      nickname: '',
      gender: '',
      age: null,
      job: '',
      incomeRange: '',
      agreePolicy: false,
    },
    genders: GENDER_OPTIONS,
    incomes: INCOME_OPTIONS,
    ages: AGE_OPTIONS,
    genderIndex: -1,
    incomeIndex: -1,
    ageIndex: -1,
  },

  async onLoad() {
    try {
      const profile = await getProfile();
      const genderIndex = GENDER_OPTIONS.findIndex((x) => x.value === profile.gender);
      const incomeIndex = INCOME_OPTIONS.findIndex((x) => x.value === profile.incomeRange);
      const ageIndex = AGE_OPTIONS.findIndex((x) => x === profile.age);
      this.setData({
        isEdit: true,
        form: { ...this.data.form, ...profile, agreePolicy: true },
        genderIndex,
        incomeIndex,
        ageIndex,
      });
      this.refreshValidity();
    } catch (_e) {}
  },

  refreshValidity() {
    this.setData({ submitDisabled: Boolean(validateProfile(this.data.form)) });
  },

  async onGetPhoneNumber(e) {
    const code = e.detail.code;
    if (!code) {
      wx.showToast({ title: 'Phone auth failed', icon: 'none' });
      return;
    }
    try {
      const { phone } = await bindPhone(code);
      this.setData({ 'form.phone': phone });
      this.refreshValidity();
    } catch (error) {
      wx.showToast({ title: error.message, icon: 'none' });
    }
  },

  onInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [`form.${field}`]: e.detail.value });
    this.refreshValidity();
  },

  onAgeChange(e) {
    const idx = Number(e.detail.value);
    this.setData({ ageIndex: idx, 'form.age': AGE_OPTIONS[idx] });
    this.refreshValidity();
  },

  onGenderChange(e) {
    const idx = Number(e.detail.value);
    this.setData({ genderIndex: idx, 'form.gender': GENDER_OPTIONS[idx].value });
    this.refreshValidity();
  },

  onIncomeChange(e) {
    const idx = Number(e.detail.value);
    this.setData({ incomeIndex: idx, 'form.incomeRange': INCOME_OPTIONS[idx].value });
  },

  onPolicyChange(e) {
    this.setData({ 'form.agreePolicy': e.detail.value.includes('agree') });
    this.refreshValidity();
  },

  async onSubmit() {
    const error = validateProfile(this.data.form);
    if (error) {
      wx.showToast({ title: error, icon: 'none' });
      return;
    }
    this.setData({ loading: true });
    try {
      const payload = { ...this.data.form };
      delete payload.agreePolicy;
      if (this.data.isEdit) {
        await updateProfile(payload);
      } else {
        await createProfile(payload);
      }
      wx.redirectTo({ url: '/pages/profile/success/success' });
    } catch (err) {
      wx.showToast({ title: err.message || 'Submit failed', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },
});
