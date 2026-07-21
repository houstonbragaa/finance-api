import { NoOneUsersFoundError } from '../errors/user.js'

import { internalServerError, notFound, ok } from './helpers/http.js'

export class GetUsersAllController {
  constructor(GetUsersAllService) {
    this.GetUsersAllService = GetUsersAllService
  }

  async execute() {
    try {
      const users = await this.GetUsersAllService.execute()

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
