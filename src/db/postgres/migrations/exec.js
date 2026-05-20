import 'dotenv/config'
import { pool } from '../helper.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'

const executeMigration = async () => {
  const client = await pool.connect()

  try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    const filePath = path.join(__dirname, '01-init.sql')
    const result = readFileSync(filePath).toString()
    await client.query(result)
    console.log('migration executed successfully!')
  } catch (error) {
    console.log(error)
  } finally {
    await client.release()
  }
}

executeMigration()
