import { helperPostgres } from '../../../db/postgres/helpers.js'

export class PostgresGetUserByIdRepository {
  async execute(userId) {
    const user = await helperPostgres.query(
      'SELECT * FROM users WHERE id = $1',
      [userId],
    )

    return user[0]
  }
}
