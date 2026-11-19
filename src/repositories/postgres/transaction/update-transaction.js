import { helperPostgres } from '../../../db/postgres/helpers.js'

export class UpdateTransactionRepository {
  async execute(transactionId, params) {
    const updateFields = []
    const updateValues = []

    Object.keys(params).forEach((key) => {
      updateFields.push(`${key} = $${updateValues.length + 1}`)
      updateValues.push(params[key])
    })

    updateValues.push(transactionId)

    const updateQuery = `
      UPDATE transactions
      SET ${updateFields.join(', ')}
      WHERE id = $${updateValues.length}
      RETURNING *
    `

    const result = await helperPostgres.query(updateQuery, updateValues)
    return result[0]
  }
}
