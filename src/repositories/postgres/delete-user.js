import { helperPostgres } from '../../db/postgres/helpers.js'

export class PostgresDeleteUserRepository {
  async execute(userId) {
    const user = await helperPostgres.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [userId],
    )

    return user[0]
  }
}
