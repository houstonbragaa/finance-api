import { NoOneUsersFoundError } from '../errors/user.js'

export class GetUsersAllService {
  constructor(PostgresGetUserAllRepository) {
    this.PostgresGetUserAllRepository = PostgresGetUserAllRepository
  }

  async execute() {
    const users = await this.PostgresGetUserAllRepository.execute()

    if (!users) {
      throw new NoOneUsersFoundError()
    }

    return users
  }
}
