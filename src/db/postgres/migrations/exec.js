import 'dotenv/config'
import { pool } from '../helper.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'

const executeMigration = async () => {
  const client = await pool.connect() //conecta com o banco de dados postgres

  try {
    const __filename = fileURLToPath(import.meta.url) //pega o filename
    const __dirname = path.dirname(__filename) //pega o dirname

    const filePath = path.join(__dirname, '01-init.sql') //pega o diretorio atual com o 01-init.sql
    const result = readFileSync(filePath).toString() //pega o arquivo
    await client.query(result) //sobe para o banco de dados
    console.log('migration executed successfully!')
  } catch (error) {
    console.log(error)
  } finally {
    await client.release() //deixa atualizado
  }
}

executeMigration()
