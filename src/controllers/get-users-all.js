import { NoOneUsersFoundError } from '../errors/user.js'
import { GetUsersAllService } from '../services/get-users-all.js'
import { internalServerError, notFound, ok } from './helpers/http.js'

export class GetUsersAllController {
  async execute() {
    try {
      const getUsersAllService = new GetUsersAllService()
      const users = await getUsersAllService.execute()

      return ok(users)
    } catch (error) {
      console.log(error)
      if (error instanceof NoOneUsersFoundError) {
        return notFound({ errorMessage: error.message })
      }

      return internalServerError()
    }
  }
}
