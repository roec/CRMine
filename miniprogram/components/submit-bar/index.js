Component({
  properties: {
    disabled: Boolean,
    loading: Boolean,
    text: {
      type: String,
      value: 'Submit',
    },
  },
  methods: {
    onTap() {
      this.triggerEvent('submit');
    },
  },
});
