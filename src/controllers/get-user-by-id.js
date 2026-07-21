import { UserNotFoundError } from '../errors/user.js'
import {
  internalServerError,
  notFound,
  ok,
  checkIdIsValid,
  idIsIvalidMessage,
} from './helpers/index.js'

export class GetUserByIdController {
  constructor(GetUserByIdService) {
    this.GetUserByIdService = GetUserByIdService
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId
      const idIsValid = checkIdIsValid(userId)
      if (!idIsValid) {
        return idIsIvalidMessage()
      }

      const user = await this.GetUserByIdService.execute(
        httpRequest.params.userId,
      )

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
