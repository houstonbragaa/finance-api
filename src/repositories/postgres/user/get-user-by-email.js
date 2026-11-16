import { helperPostgres } from '../../../db/postgres/helpers.js'

export class GetUserByEmailRepository {
  async execute(email) {
    const user = await helperPostgres.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    )

    return user[0]
  }
}
