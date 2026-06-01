import 'dotenv/config'
import { pool } from '../helper.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync, readdirSync } from 'fs'

const executeMigration = async () => {
  const client = await pool.connect() //conecta com o banco de dados postgres

  try {
    const __filename = fileURLToPath(import.meta.url) //pega o filename
    const __dirname = path.dirname(__filename) //pega o dirname

    const migrationFiles = readdirSync(__dirname)
      .filter((file) => file.endsWith('.sql'))
      .sort()

    for (const file of migrationFiles) {
      const filePath = path.join(__dirname, file)
      const sql = readFileSync(filePath).toString()
      await client.query(sql)
      console.log(`${file} executed successfully!`)
    }

    console.log('all migrations executed successfully!')
  } catch (error) {
    console.log(error)
  } finally {
    await client.release() //deixa atualizado
  }
}

executeMigration()
