import {
  PostgresCreateUserRepository,
  PostgresDeleteUserRepository,
  PostgresGetUserAllRepository,
  PostgresGetUserByEmailRepository,
  PostgresGetUserByIdRepository,
  PostgresUpdateUserRepository,
} from '../../repositories/postgres/index.js'

import {
  CreateUserService,
  DeleteUserService,
  GetUserByIdService,
  GetUsersAllService,
  UpdateUserService,
} from '../../services/index.js'

import { CreateUserController } from '../../../src/controllers/create-user.js'
import { GetUserByIdController } from '../../../src/controllers/get-user-by-id.js'
import { GetUsersAllController } from '../../../src/controllers/get-users-all.js'
import { UpdateUserController } from '../../../src/controllers/update-user.js'
import { DeleteUserController } from '../../../src/controllers/delete-user.js'

export const makeCreateUserController = () => {
  const emailRepository = new PostgresGetUserByEmailRepository()
  const repository = new PostgresCreateUserRepository()
  const service = new CreateUserService(repository, emailRepository)
  const controller = new CreateUserController(service)
  return controller
}

export const makeGetUserByIdController = () => {
  const repository = new PostgresGetUserByIdRepository()
  const service = new GetUserByIdService(repository)
  const controller = new GetUserByIdController(service)
  return controller
}

export const makeUpdateController = () => {
  const emailRepository = new PostgresGetUserByEmailRepository()
  const repository = new PostgresUpdateUserRepository()
  const service = new UpdateUserService(repository, emailRepository)
  const controller = new UpdateUserController(service)
  return controller
}

export const makeGetUsersController = () => {
  const repository = new PostgresGetUserAllRepository()
  const service = new GetUsersAllService(repository)
  const controller = new GetUsersAllController(service)
  return controller
}

export const makeDeleteUserController = () => {
  const repository = new PostgresDeleteUserRepository()
  const service = new DeleteUserService(repository)
  const controller = new DeleteUserController(service)
  return controller
}
