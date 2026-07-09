import validator from 'validator'
import {
  badRequest,
  internalServerError,
  notFound,
  ok,
} from './helpers/http.js'
import { UpdateUserService } from '../services/update-user.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import { checkIdIsValid } from './helpers/user.js'

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const userId = httpRequest.params.userId
      const idIsNotValid = checkIdIsValid(userId)

      if (idIsNotValid) {
        return notFound({ errorMessage: 'User not found!' })
      }

      const allowedFields = ['first_name', 'last_name', 'email', 'password']
      const someFieldsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      )

      if (someFieldsNotAllowed) {
        return badRequest({ errorMessage: 'Field not found!' })
      }

      if (params.email) {
        const emailIsNotValid = !validator.isEmail(params.email)
        if (emailIsNotValid)
          return badRequest({ errorMessage: 'Email is not valid!' })
      }

      if (params.password) {
        if (params.password.length < 8) {
          return badRequest({
            errorMessage: 'Password need have more than 7 chars',
          })
        }
      }

      const updateUserService = new UpdateUserService()
      const updatedUser = await updateUserService.execute(userId, params)

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
