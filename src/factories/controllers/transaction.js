import {
  CreateTransactionController,
  GetTransactionsByUserIdController,
} from '../../controllers/index.js'
import {
  PostgresCreateTransactionRepository,
  PostgresGetTransactionsByUserIdRepository,
  PostgresGetUserByIdRepository,
} from '../../repositories/postgres/index.js'
import {
  CreateTransactionService,
  GetTransactionsByUserIdService,
} from '../../services/index.js'

export const makeCreateTransactionController = () => {
  const repository = new PostgresCreateTransactionRepository()

  const idRepository = new PostgresGetUserByIdRepository()

  const service = new CreateTransactionService(repository, idRepository)

  const controller = new CreateTransactionController(service)

  return controller
}

export const makeGetTransactionsByUserId = () => {
  const repository = new PostgresGetTransactionsByUserIdRepository()

  const idRepository = new PostgresGetUserByIdRepository()

  const service = new GetTransactionsByUserIdService(repository, idRepository)

  const controller = new GetTransactionsByUserIdController(service)

  return controller
}
