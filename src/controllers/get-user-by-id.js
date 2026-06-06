import { GetUserByIdService } from '../services/get-user-by-id.js'
import { badRequest, internalServerError, ok } from './helpers.js'
import validator from 'validator'

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const idIsValid = validator.isUUID(httpRequest.params.userId)
      if (!idIsValid) {
        return badRequest({ errorMessage: 'Id is invalid!' })
      }

      const service = new GetUserByIdService()
      const user = await service.execute(httpRequest.params.userId)

      return ok(user)
    } catch (error) {
      console.log(error)
      return internalServerError()
    }
  }
}
