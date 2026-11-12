import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const checkIdIsValid = (userId) => validator.isUUID(userId)

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

//errors

export const idIsIvalidMessage = () =>
  notFound({ errorMessage: 'Id is invalid' })

export const requiredMissingFieldsMessage = (missingField) =>
  badRequest({
    message: `Missing fields: ${missingField}`,
  })
