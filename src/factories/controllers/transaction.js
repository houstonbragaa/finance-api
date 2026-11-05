import { CreateTransactionController } from '../../controllers/transaction/create-transaction.js'
import {
  PostgresCreateTransactionRepository,
  PostgresGetUserByIdRepository,
} from '../../repositories/postgres/index.js'
import { CreateTransactionService } from '../../services'

export const makeCreateTransactionController = () => {
  const createTransactionRepository = new PostgresCreateTransactionRepository()

  const getUserByIdRepository = new PostgresGetUserByIdRepository()

  const createTransactionService = new CreateTransactionService(
    createTransactionRepository,
    getUserByIdRepository,
  )

  const createTransactionController = new CreateTransactionController(
    createTransactionService,
  )
  return createTransactionController
}
