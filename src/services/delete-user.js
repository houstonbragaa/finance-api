export class DeleteUserService {
  constructor(PostgresDeleteUserRepository) {
    this.PostgresDeleteUserRepository = PostgresDeleteUserRepository
  }

  async execute(userId) {
    const user = await this.PostgresDeleteUserRepository.execute(userId)

    return user
  }
}
