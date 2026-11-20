import { helperPostgres } from '../../../db/postgres/helpers.js'

export class DeleteTransactionRepository {
  async execute(transactionId) {
    const deletedTransaction = await helperPostgres.query(
      `DELETE FROM transactions
       WHERE id = $1
       RETURNING *`,
      [transactionId],
    )

    return deletedTransaction[0]
  }
}
