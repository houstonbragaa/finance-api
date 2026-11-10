import validator from 'validator'
import { notFound } from './http.js'

export const checkIdIsValid = (userId) => validator.isUUID(userId)

export const idIsIvalidMessage = () =>
  notFound({ errorMessage: 'User not found!' })

const checkIfIsString = (value) => typeof value === 'string'

export const validadeRequiredFields = (params, requiredFields) => {
  for (const field of requiredFields) {
    const fieldsIsMissing = params[field]
    const fieldIsEmpty =
      checkIfIsString(params[field]) &&
      validator.isEmpty(params[field], {
        ignore_whitespace: true,
      })
    if (!fieldsIsMissing || fieldIsEmpty) {
      return {
        missingField: field,
        ok: false,
      }
    }
  }
  return {
    ok: true,
    missingField: undefined,
  }
}
