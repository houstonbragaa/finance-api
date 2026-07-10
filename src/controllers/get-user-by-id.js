import { UserNotFoundError } from '../errors/user.js'
import { GetUserByIdService } from '../services/get-user-by-id.js'
import { internalServerError, notFound, ok } from './helpers/http.js'

import { checkIdIsValid, idIsIvalidMessage } from './helpers/user.js'

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId
      const idIsValid = checkIdIsValid(userId)
      if (!idIsValid) {
        return idIsIvalidMessage()
      }

      const service = new GetUserByIdService()
      const user = await service.execute(httpRequest.params.userId)

      return ok(user)
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return notFound({ errorMessage: error.message })
      }
      console.log(error)
      return internalServerError()
    }
  }
}
