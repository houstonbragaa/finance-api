import validator from 'validator'
import {
  badRequest,
  internalServerError,
  notFound,
  ok,
} from './helpers/http.js'
import { UpdateUserService } from '../services/update-user.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const updateUserParams = httpRequest.body

      const userId = httpRequest.params.userId
      const idIsNotValid = !validator.isUUID(userId)

      if (idIsNotValid) {
        return notFound({ errorMessage: 'User not found!' })
      }

      const allowedFields = ['first_name', 'last_name', 'email', 'password']
      const someFieldsNotAllowed = Object.keys(updateUserParams).some(
        (field) => !allowedFields.includes(field),
      )

      if (someFieldsNotAllowed) {
        return badRequest({ errorMessage: 'Field not found!' })
      }

      if (updateUserParams.email) {
        const emailIsNotValid = !validator.isEmail(updateUserParams.email)
        if (emailIsNotValid)
          return badRequest({ errorMessage: 'Email is not valid!' })
      }

      if (updateUserParams.password) {
        if (updateUserParams.password.length < 8) {
          return badRequest({
            errorMessage: 'Password need have more than 7 chars',
          })
        }
      }

      const updateUserService = new UpdateUserService()
      const updatedUser = await updateUserService.execute(
        userId,
        updateUserParams,
      )

      return ok(updatedUser)
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ errorMessage: error.message })
      }
      console.log(error)
      return internalServerError()
    }
  }
}
