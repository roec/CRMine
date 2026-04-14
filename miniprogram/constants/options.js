/** @type {{label:string,value:string}[]} */
const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
  { label: 'Undisclosed', value: 'undisclosed' },
];

/** @type {{label:string,value:string}[]} */
const INCOME_OPTIONS = [
  { label: 'Below 5k', value: 'below_5k' },
  { label: '5k - 10k', value: '5k_10k' },
  { label: '10k - 20k', value: '10k_20k' },
  { label: '20k - 30k', value: '20k_30k' },
  { label: '30k - 50k', value: '30k_50k' },
  { label: 'Above 50k', value: 'above_50k' },
];

const AGE_OPTIONS = Array.from({ length: 83 }, (_, i) => i + 18);

module.exports = {
  GENDER_OPTIONS,
  INCOME_OPTIONS,
  AGE_OPTIONS,
};
