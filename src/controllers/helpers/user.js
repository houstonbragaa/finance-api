import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const passwordLengthMessage = () =>
  badRequest({ errorMessage: 'The password need have more then 7 chars!' })

export const idIsIvalidMessage = () =>
  notFound({ errorMessage: 'Usuário não encontrado!' })

export const checkIdIsValid = (userId) => validator.isUUID(userId)

export const checkPasswordLength = (password) => password.length > 7
