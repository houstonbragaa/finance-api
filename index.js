import 'dotenv/config'
import express from 'express'
import { CreateUserController } from './src/controllers/create-user.js'
import { GetUserByIdController } from './src/controllers/get-user-by-id.js'
import { GetUsersAllController } from './src/controllers/get-users-all.js'

const app = express() //crio um servidor com express

app.use(express.json())

app.post('/api/users', async (req, res) => {
  const controller = new CreateUserController()
  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (req, res) => {
  const controller = new GetUserByIdController()
  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

app.get('/api/users', async (req, res) => {
  const controller = new GetUsersAllController()
  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.EXPRESS_PORT}`)
}) //aplicação disponível na porta 8080
