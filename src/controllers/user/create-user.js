import { EmailAlreadyInUseError } from '../../errors/user.js'
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres/user/get-user-by-email.js'

import {
  badRequest,
  internalServerError,
  successCreate,
  checkEmailIsValid,
  checkPasswordLength,
  emailIsAlreadyExistsMessage,
  emailIsInvalidMessage,
  passwordLengthMessage,
  validadeRequiredFields,
} from '../helpers/index.js'

export class CreateUserController {
  constructor(CreateUserService) {
    this.CreateUserService = CreateUserService
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const fieldsList = ['first_name', 'last_name', 'email', 'password']

      const { ok, missingField } = validadeRequiredFields(params, fieldsList)
      if (!ok) {
        return badRequest({
          message: `Missing fields: ${missingField}`,
        })
      }

      const emailIsValid = checkEmailIsValid(params.email)
      if (!emailIsValid) return emailIsInvalidMessage()

      const passwordIsValid = checkPasswordLength(params.password)
      if (!passwordIsValid) return passwordLengthMessage()

      const postgresEmail = new PostgresGetUserByEmailRepository()
      const emailAlreadyExists = await postgresEmail.execute(params.email)
      if (emailAlreadyExists) return emailIsAlreadyExistsMessage(params.email)

      //chamar o service (use-case)
      const createdUser = await this.CreateUserService.execute(params)
      return successCreate(createdUser)
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return emailIsAlreadyExistsMessage()
      }
      console.log(error)
      return internalServerError()
    }
  }
}
