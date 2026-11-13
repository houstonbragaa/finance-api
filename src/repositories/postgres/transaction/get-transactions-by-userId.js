import { helperPostgres } from '../../../db/postgres/helpers.js'

export class PostgresGetTransactionsByUserIdRepository {
  async execute(userId) {
    const transactions = await helperPostgres.query(
      `
      SELECT * FROM transactions WHERE user_id = $1
    `,
      [userId],
    )

    return transactions
  }
}
