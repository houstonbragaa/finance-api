import {
  CreateTransactionController,
  GetTransactionsByUserIdController,
} from '../../controllers/index.js'
import {
  CreateTransactionRepository,
  GetTransactionsByUserIdRepository,
  GetUserByIdRepository,
} from '../../repositories/postgres/index.js'
import {
  CreateTransactionService,
  GetTransactionsByUserIdService,
} from '../../services/index.js'

export const makeCreateTransactionController = () => {
  const repository = new CreateTransactionRepository()

  const idRepository = new GetUserByIdRepository()

  const service = new CreateTransactionService(repository, idRepository)

  const controller = new CreateTransactionController(service)

  return controller
}

export const makeGetTransactionsByUserId = () => {
  const repository = new GetTransactionsByUserIdRepository()

  const idRepository = new GetUserByIdRepository()

  const service = new GetTransactionsByUserIdService(repository, idRepository)

  const controller = new GetTransactionsByUserIdController(service)

  return controller
}
