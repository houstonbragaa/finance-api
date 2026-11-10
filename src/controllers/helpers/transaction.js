import validator from 'validator'
import { badRequest } from './http'

export const checkAmountIsValid = (amount) =>
  validator.isCurrency(amount, {
    digits_after_decimal: [2],
    allow_negatives: false,
    decimal_separator: '.',
  })

export const checkTypeIsValid = (type) =>
  ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)

//errors

export const checkValidCurrencyMessage = () =>
  badRequest({
    message: `The amount must be a valid currency`,
  })

export const checkRequiredTypeMessage = () =>
  badRequest({
    message: `The type is invalid`,
  })
