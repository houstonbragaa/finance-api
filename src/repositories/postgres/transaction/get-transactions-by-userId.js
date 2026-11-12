import { helperPostgres } from '../../../db/postgres/helpers'

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
