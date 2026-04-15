const { GENDER_OPTIONS, INCOME_OPTIONS, AGE_OPTIONS } = require('../../../constants/options');
const { ensureSession } = require('../../../services/auth');
const { bindPhone, createProfile, getProfile, updateProfile } = require('../../../services/user');
const { validateProfile } = require('../../../utils/validate');

Page({
  data: {
    loading: false,
    submitDisabled: true,
    isEdit: false,
    nicknameFetched: false,
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
    await ensureSession();

    try {
      const profile = await getProfile();
      const genderIndex = GENDER_OPTIONS.findIndex((x) => x.value === profile.gender);
      const incomeIndex = INCOME_OPTIONS.findIndex((x) => x.value === profile.incomeRange);
      const ageIndex = AGE_OPTIONS.findIndex((x) => x === profile.age);
      this.setData({
        isEdit: true,
        nicknameFetched: Boolean(profile.nickname),
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

  onNameFocus() {
    if (this.data.nicknameFetched) {
      return;
    }
    this.onGetNickname();
  },

  onGetNickname() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: ({ userInfo }) => {
        const nickname = (userInfo && userInfo.nickName) || '';
        this.setData({
          nicknameFetched: true,
          'form.nickname': nickname,
          'form.realName': this.data.form.realName || nickname,
        });
        this.refreshValidity();
      },
      fail: () => {
        wx.showToast({ title: '昵称授权未完成', icon: 'none' });
      },
    });
  },

  async onGetPhoneNumber(e) {
    const { code, errMsg } = e.detail || {};
    if (!code) {
      wx.showToast({ title: errMsg?.includes('deny') ? '已取消手机号授权' : '手机号授权失败', icon: 'none' });
      return;
    }

    try {
      const { phone } = await bindPhone(code);
      this.setData({ 'form.phone': phone });
      this.refreshValidity();
    } catch (error) {
      wx.showToast({ title: `绑定失败：${error.message || '请稍后重试'}`, icon: 'none' });
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
      wx.showToast({ title: err.message || '提交失败', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },
});
