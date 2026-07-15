import { DeleteUserService } from '../services/delete-user.js'
import {
  checkIdIsValid,
  idIsIvalidMessage,
  internalServerError,
  ok,
} from './helpers/index.js'

export class DeleteUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId

      const idIsValid = checkIdIsValid(userId)

      if (!idIsValid) {
        return idIsIvalidMessage()
      }

      const deleteUserService = new DeleteUserService()
      const deletedUser = await deleteUserService.execute(userId)
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
