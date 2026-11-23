import {
  CreateTransactionController,
  GetTransactionsByUserIdController,
  UpdateTransactionController,
  DeleteTransactionController,
} from '../../controllers/index.js'
import {
  CreateTransactionRepository,
  GetTransactionsByUserIdRepository,
  GetUserByIdRepository,
  UpdateTransactionRepository,
  DeleteTransactionRepository,
} from '../../repositories/postgres/index.js'
import {
  CreateTransactionService,
  GetTransactionsByUserIdService,
  DeleteTransactionService,
  UpdateTransactionService,
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

export const makeUpdateTransactionController = () => {
  const repository = new UpdateTransactionRepository()

  const service = new UpdateTransactionService(repository)

  const controller = new UpdateTransactionController(service)
  return controller
}

export const makeDeleteTransactionController = () => {
  const repository = new DeleteTransactionRepository()

  const service = new DeleteTransactionService(repository)

  const controller = new DeleteTransactionController(service)
  return controller
}
