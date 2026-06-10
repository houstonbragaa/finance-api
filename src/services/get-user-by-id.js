import { UserNotFoundError } from '../errors/user.js'
import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id.js'

export class GetUserByIdService {
  async execute(userId) {
    const repository = new PostgresGetUserByIdRepository()
    const user = await repository.execute(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  }
}
