import { PostgresDeleteUserRepository } from '../repositories/postgres/delete-user.js'

export class DeleteUserService {
  async execute(userId) {
    const deleteRepository = new PostgresDeleteUserRepository()
    const user = await deleteRepository.execute(userId)

    return user
  }
}
