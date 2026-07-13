import { UpdateUserService } from '../services/update-user.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
  checkEmailIsValid,
  checkIdIsValid,
  checkPasswordLength,
  emailIsAlreadyExistsMessage,
  emailIsInvalidMessage,
  idIsIvalidMessage,
  passwordLengthMessage,
  badRequest,
  internalServerError,
  ok,
} from './helpers/index.js'

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const userId = httpRequest.params.userId
      const idIsValid = checkIdIsValid(userId)

      if (!idIsValid) {
        return idIsIvalidMessage()
      }

      const allowedFields = ['first_name', 'last_name', 'email', 'password']
      const someFieldsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      )

      if (someFieldsNotAllowed) {
        return badRequest({ errorMessage: 'Field not found!' })
      }

      if (params.email) {
        const emailIsValid = checkEmailIsValid(params.email)
        if (!emailIsValid) return emailIsInvalidMessage()
      }

      if (params.password) {
        const passwordIsValid = checkPasswordLength(params.password)
        if (!passwordIsValid) {
          return passwordLengthMessage()
        }
      }

      const updateUserService = new UpdateUserService()
      const updatedUser = await updateUserService.execute(userId, params)

      return ok(updatedUser)
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return emailIsAlreadyExistsMessage()
      }
      console.log(error)
      return internalServerError()
    }
  }
}
