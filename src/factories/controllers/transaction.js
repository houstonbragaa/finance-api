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

export const makeGetTransactionsByUserId = () => {
  const getTransactionsByUserIdRepository =
    new PostgresGetTransactionsByUserIdRepository()

  const getUserByIdRepository = new PostgresGetUserByIdRepository()

  const getTransactionsByUserIdService = new GetTransactionsByUserIdService(
    getTransactionsByUserIdRepository,
    getUserByIdRepository,
  )

  const getTransactionsByUserIdController =
    new GetTransactionsByUserIdController(getTransactionsByUserIdService)

  return getTransactionsByUserIdController
}
