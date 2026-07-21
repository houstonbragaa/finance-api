import 'dotenv/config'
import express from 'express'

import { PostgresCreateUserRepository } from './src/repositories/postgres/create-user.js'
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js'

import { CreateUserService } from './src/services/create-user.js'
import { GetUserByIdService } from './src/services/get-user-by-id.js'

import { CreateUserController } from './src/controllers/create-user.js'
import { GetUserByIdController } from './src/controllers/get-user-by-id.js'
import { GetUsersAllController } from './src/controllers/get-users-all.js'
import { UpdateUserController } from './src/controllers/update-user.js'
import { DeleteUserController } from './src/controllers/delete-user.js'

const app = express() //crio um servidor com express

app.use(express.json())

app.post('/api/users', async (req, res) => {
  const repository = new PostgresCreateUserRepository()
  const service = new CreateUserService(repository)
  const controller = new CreateUserController(service)

  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (req, res) => {
  const repository = new PostgresGetUserByIdRepository()
  const service = new GetUserByIdService(repository)
  const controller = new GetUserByIdController(service)

  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (req, res) => {
  const controller = new UpdateUserController()
  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

app.get('/api/users', async (req, res) => {
  const controller = new GetUsersAllController()
  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (req, res) => {
  const controller = new DeleteUserController()
  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.EXPRESS_PORT}`)
}) //aplicação disponível na porta 8080
