import { helperPostgres } from '../../db/postgres/helper'

export class PostgresGetUserById {
  async execute(userId) {
    const user = await helperPostgres.query(
      'SELECT * FROM users WHERE id = $1',
      [userId],
    )

    return user[0]
  }
}
