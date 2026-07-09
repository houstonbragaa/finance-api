import { helperPostgres } from '../../db/postgres/helpers.js'

export class PostgresCreateUserRepository {
  async execute(params) {
    await helperPostgres.query(
      `
      INSERT INTO users (id, first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4, $5)
    `,
      [
        params.id,
        params.first_name,
        params.last_name,
        params.email,
        params.password,
      ],
    )

    const createdUser = await helperPostgres.query(
      'SELECT * FROM users WHERE id = $1',
      [params.id],
    )

    return createdUser[0]
  }
}
