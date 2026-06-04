import { helperPostgres } from '../../db/postgres/helper.js'

export class PostgresCreateUserRepository {
  async execute(createUserParams) {
    await helperPostgres.query(
      `
      INSERT INTO users (id, first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4, $5)
    `,
      [
        createUserParams.id,
        createUserParams.first_name,
        createUserParams.last_name,
        createUserParams.email,
        createUserParams.password,
      ],
    )

    const createdUser = await helperPostgres.query(
      'SELECT * FROM users WHERE id = $1',
      [createUserParams.id],
    )

    return createdUser[0]
  }
}

export class PostgresValidatorEmail {
  async execute(emailParams) {
    const rows = await helperPostgres.query(
      'SELECT id FROM users WHERE email = $1',
      [emailParams],
    )

    return rows.length > 0
  }
}
