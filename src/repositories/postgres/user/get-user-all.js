import { helperPostgres } from '../../../db/postgres/helpers.js'

export class PostgresGetUserAllRepository {
  async execute() {
    const result = await helperPostgres.query('SELECT * FROM users')
    return result
  }
}
