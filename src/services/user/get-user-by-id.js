import { UserNotFoundError } from '../../errors/user.js'

export class GetUserByIdService {
  constructor(PostgresGetUserByIdRepository) {
    this.PostgresGetUserByIdRepository = PostgresGetUserByIdRepository
  }

  async execute(userId) {
    const user = await this.PostgresGetUserByIdRepository.execute(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  }
}
