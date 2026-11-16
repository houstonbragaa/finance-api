import {
  CreateUserRepository,
  DeleteUserRepository,
  GetUserAllRepository,
  GetUserByEmailRepository,
  GetUserByIdRepository,
  UpdateUserRepository,
} from '../../repositories/postgres/index.js'

import {
  CreateUserService,
  DeleteUserService,
  GetUserByIdService,
  GetUsersAllService,
  UpdateUserService,
} from '../../services/index.js'

import {
  CreateUserController,
  GetUserByIdController,
  GetUsersAllController,
  UpdateUserController,
  DeleteUserController,
} from '../../controllers/index.js'

export const makeCreateUserController = () => {
  const emailRepository = new GetUserByEmailRepository()
  const repository = new CreateUserRepository()
  const service = new CreateUserService(repository, emailRepository)
  const controller = new CreateUserController(service)
  return controller
}

export const makeGetUserByIdController = () => {
  const repository = new GetUserByIdRepository()
  const service = new GetUserByIdService(repository)
  const controller = new GetUserByIdController(service)
  return controller
}

export const makeUpdateController = () => {
  const emailRepository = new GetUserByEmailRepository()
  const repository = new UpdateUserRepository()
  const service = new UpdateUserService(repository, emailRepository)
  const controller = new UpdateUserController(service)
  return controller
}

export const makeGetUsersController = () => {
  const repository = new GetUserAllRepository()
  const service = new GetUsersAllService(repository)
  const controller = new GetUsersAllController(service)
  return controller
}

export const makeDeleteUserController = () => {
  const repository = new DeleteUserRepository()
  const service = new DeleteUserService(repository)
  const controller = new DeleteUserController(service)
  return controller
}
