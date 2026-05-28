import { helperPostgres } from '../../db/postgres/helper'

export class PostgresCreateUserRepository {
  async execute(createUserParams) {
    const results = await helperPostgres.query(
      `
      INSERT INTO users (ID, first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [
        createUserParams.id,
        createUserParams.first_name,
        createUserParams.last_name,
        createUserParams.email,
        createUserParams.password,
      ],
    )

    return results[0].rows
  }
}
