/** @type {{label:string,value:string}[]} */
const GENDER_OPTIONS = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
  { label: '其他', value: 'other' },
  { label: '不方便透露', value: 'undisclosed' },
];

/** @type {{label:string,value:string}[]} */
const INCOME_OPTIONS = [
  { label: '5k 以下', value: 'below_5k' },
  { label: '5k - 10k', value: '5k_10k' },
  { label: '10k - 20k', value: '10k_20k' },
  { label: '20k - 30k', value: '20k_30k' },
  { label: '30k - 50k', value: '30k_50k' },
  { label: '50k 以上', value: 'above_50k' },
];

const AGE_OPTIONS = Array.from({ length: 83 }, (_, i) => i + 18);

module.exports = {
  GENDER_OPTIONS,
  INCOME_OPTIONS,
  AGE_OPTIONS,
};
