import { helperPostgres } from '../../db/postgres/helper'

export class PostgresUserCreateReposiry {
  async execute(userCreateParams) {
    const results = await helperPostgres.query(
      `
      INSERT INTO users (ID, first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [
        userCreateParams.id,
        userCreateParams.first_name,
        userCreateParams.last_name,
        userCreateParams.email,
        userCreateParams.password,
      ],
    )

    return results[0].rows
  }
}
