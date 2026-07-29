import { helperPostgres } from '../../../db/postgres/helpers.js'

export class PostgresUpdateUserRepository {
  async execute(userId, params) {
    const updateFields = []
    const updateValues = []

    Object.keys(params).forEach((key) => {
      updateFields.push(`${key} = $${updateValues.length + 1}`)
      updateValues.push(params[key])
    })

    updateValues.push(userId)

    const updateQuery = `
      UPDATE users
      SET ${updateFields.join(', ')}
      WHERE id = $${updateValues.length}
      RETURNING *
    `

    const result = await helperPostgres.query(updateQuery, updateValues)
    return result[0]
  }
}
