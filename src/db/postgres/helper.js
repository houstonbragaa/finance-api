import pg from 'pg'
const { Pool } = pg

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  host: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
}) //cria um poll no banco de dados com as variáveis de ambiente

export const helperPostgres = {
  query: async (query, params) => {
    const client = await pool.connect() //pega o cliente

    const results = await client.query(query, params) //faz a query do banco

    await client.release() //devolve o cliente para o pool de conexão, mantendo atualizado

    return results.rows // retorna as linhas da tabela
  },
}
