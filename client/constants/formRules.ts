import { onlyDigitRegExp } from './regexp';

export const ruleMin1 = { min: { value: 1, message: 'Minimum is 1' } };

export const ruleOnlyDigit = {
  pattern: {
    value: onlyDigitRegExp,
    message: 'Only digits are allowed'
  }
};
