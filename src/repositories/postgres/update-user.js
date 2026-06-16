import { helperPostgres } from '../../db/postgres/helpers'

export class PostgresUpdateUserRepository {
  async execute(userId, updateUserParams) {
    const updateFields = []
    const updateValues = []

    Object.keys(updateUserParams).forEach((key) => {
      updateFields.push(`${key} = ${updateValues.length + 1}`)
      updateValues.push(updateUserParams[key])
    })

    updateValues.push(userId)

    const updateQuery = `
      UPDATE users
      SET ${updateFields.join(', ')}
      WHERE id = $${updateValues.lenght}
      RETURNING *
    `

    const result = await helperPostgres.query(updateQuery, updateValues)
    return result[0]
  }
}
