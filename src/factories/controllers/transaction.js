import {
  CreateTransactionController,
  GetTransactionsByUserIdController,
  UpdateTransactionController,
} from '../../controllers/index.js'
import {
  CreateTransactionRepository,
  GetTransactionsByUserIdRepository,
  GetUserByIdRepository,
} from '../../repositories/postgres/index.js'
import { UpdateTransactionRepository } from '../../repositories/postgres/transaction/update-transaction.js'
import {
  CreateTransactionService,
  GetTransactionsByUserIdService,
} from '../../services/index.js'
import { UpdateTransactionService } from '../../services/transaction/update-transaction.js'

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

export const makeUpdateTransactionController = () => {
  const repository = new UpdateTransactionRepository()

  const service = new UpdateTransactionService(repository)

  const controller = new UpdateTransactionController(service)
  return controller
}
