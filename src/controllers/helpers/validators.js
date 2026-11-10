import validator from 'validator'
import { notFound } from './http.js'

export const checkIdIsValid = (userId) => validator.isUUID(userId)

export const idIsIvalidMessage = () =>
  notFound({ errorMessage: 'User not found!' })
