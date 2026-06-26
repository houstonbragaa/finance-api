import validator from 'validator'
import { badRequest, internalServerError, ok } from './helpers.js'

import { UpdateUserService } from '../services/update-user.js'

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const updateParams = httpRequest.body

      const idIsNotValid = !validator.isUUID(updateParams.userId)
      if (idIsNotValid) return badRequest({ errorMessage: 'Id is invalid!' })

      if (updateParams.email) {
        const emailIsNotValid = !validator.isEmail(updateParams.email)
        if (emailIsNotValid)
          return badRequest({ errorMessage: 'Email is invalid, try other!' })
      }

      if (updateParams.password) {
        if (updateParams.password.length < 8) {
          return badRequest({
            errorMessage: 'Password need have more than 7 chars',
          })
        }
      }

      const { userId, ...user } = updateParams

      if (Object.keys(user).length === 0) {
        return badRequest({ errorMessage: 'No fields to update!' })
      }

      const updateService = new UpdateUserService()
      const updatedUser = await updateService.execute(userId, user)

      return ok(updatedUser)
    } catch (error) {
      console.log(error)
      return internalServerError()
    }
  }
}
