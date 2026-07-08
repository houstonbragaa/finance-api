import validator from 'validator'

export const checkIdIsValid = (userId) => validator.isUUID(userId)
