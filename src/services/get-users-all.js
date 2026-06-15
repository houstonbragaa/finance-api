import { NoOneUsersFoundError } from '../errors/user.js'
import { PostgresGetUserAllRepository } from '../repositories/postgres/get-user-all.js'

export class GetUsersAllService {
  async execute() {
    const getUsersAllRepository = new PostgresGetUserAllRepository()
    const users = await getUsersAllRepository.execute()

    if (!users) {
      throw new NoOneUsersFoundError()
    }

    return users
  }
}
