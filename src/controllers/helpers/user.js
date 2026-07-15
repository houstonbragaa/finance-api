import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const passwordLengthMessage = () =>
  badRequest({ errorMessage: 'The password need have more then 7 chars!' })

export const idIsIvalidMessage = () =>
  notFound({ errorMessage: 'User not found!' })

export const emailIsInvalidMessage = () =>
  badRequest({ errorMessage: 'The email is not valid!' })

export const emailIsAlreadyExistsMessage = (email) =>
  badRequest({
    errorMessage: `The e-mail ${email} already in use error!`,
  })

export const checkIdIsValid = (userId) => validator.isUUID(userId)

export const checkPasswordLength = (password) => password.length > 7

export const checkEmailIsValid = (email) => validator.isEmail(email)
