import 'dotenv/config'
import express from 'express'
import { helperPostgres } from './src/db/postgres/helper.js'

const app = express() //crio um servidor com express
const port = 3000 //defino a porta

app.get('/', async (req, res) => {
  const results = await helperPostgres.query('SELECT * FROM users') //chamo esse obj

  res.send(JSON.stringify(results)) //envio os resultados para o front-end
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
