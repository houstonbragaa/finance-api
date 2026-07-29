import { helperPostgres } from '../../../db/postgres/helpers'

export class PostgresCreateTransactionRepository {
  async execute(params) {
    const createdTransaction = await helperPostgres.query(
      `
        INSERT INTO transactions (id, userId, name, amount, date, type)
        VALUES ($1, $2, $3, $4, $5, $6) 
      `,
      [
        params.id,
        params.userId,
        params.name,
        params.amount,
        params.date,
        params.type,
      ],
    )

    return createdTransaction[0]
  }
}
