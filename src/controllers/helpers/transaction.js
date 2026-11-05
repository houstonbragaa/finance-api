import validator from 'validator'

export const checkAmountIsValid = (amount) =>
  validator.isCurrency(amount, {
    digits_after_decimal: [2],
    allow_decimal: false,
    decimal_separator: '.',
  })
