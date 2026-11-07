import 'dotenv/config'
import express from 'express'
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserByIdController,
  makeGetUsersController,
  makeUpdateController,
} from './src/factories/controllers/user.js'
import { makeCreateTransactionController } from './src/factories/controllers/transaction.js'

const app = express() //crio um servidor com express

app.use(express.json())

app.post('/api/users', async (req, res) => {
  const controller = makeCreateUserController()

  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (req, res) => {
  const controller = makeGetUserByIdController()

  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (req, res) => {
  const controller = makeUpdateController()

  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

app.get('/api/users', async (req, res) => {
  const controller = makeGetUsersController()

  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (req, res) => {
  const controller = makeDeleteUserController()

  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

//transactions

app.post('/api/transactions', async (req, res) => {
  const createTransactionController = makeCreateTransactionController()

  const { statusCode, body } = await createTransactionController.execute(req)

  res.status(statusCode).send(body)
})

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.EXPRESS_PORT}`)
}) //aplicação disponível na porta 8080
