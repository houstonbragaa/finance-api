import 'dotenv/config'
import express from 'express'
import { helperPostgres } from './src/db/postgres/helper.js'

const app = express() //crio um servidor com express

app.get('/api/users', async (req, res) => {
  const results = await helperPostgres.query('SELECT * FROM users') //chamo esse obj

  res.send(JSON.stringify(results)) //envio os resultados para o front-end
})

app.post('/api/users', async (req, res) => {
  console.log(req.body) // req é um obj que tem esses métodos body, headers...
  res.status(201).send('user created')
})

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.EXPRESS_PORT}`)
}) //aplicação disponível na porta 8080
