import {
  checkIdIsValid,
  idIsIvalidMessage,
  internalServerError,
  ok,
} from './helpers/index.js'

export class DeleteUserController {
  constructor(DeleteUserService) {
    this.DeleteUserService = DeleteUserService
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId

      const idIsValid = checkIdIsValid(userId)

      if (!idIsValid) {
        return idIsIvalidMessage()
      }

      const deletedUser = await this.DeleteUserService.execute(userId)
      console.log(deletedUser)

      if (deletedUser == undefined) {
        return idIsIvalidMessage()
      }

      return ok(deletedUser)
    } catch (error) {
      console.log(error)
      return internalServerError()
    }
  }
}
