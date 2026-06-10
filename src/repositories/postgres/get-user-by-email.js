import { helperPostgres } from '../../db/postgres/helpers'

export class PostgresGetUserByEmailRepository {
  async execute(email) {
    const user = await helperPostgres.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    )

    return user[0]
  }
}
