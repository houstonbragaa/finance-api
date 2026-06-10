import { EmailAlreadyInUseError } from '../errors/user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { CreateUserService } from '../services/create-user.js'
import { badRequest, internalServerError, successCreate } from './helpers.js'
import validator from 'validator'

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const fieldsList = ['first_name', 'last_name', 'email', 'password']

      for (const field of fieldsList) {
        const fieldIsValid = !params[field] || params[field].trim().length === 0
        if (fieldIsValid) {
          return badRequest({ errorMessage: `Missing field ${field}` })
        }
      }

      const emailIsValid = validator.isEmail(params.email)
      if (!emailIsValid) return badRequest({ errorMessage: 'Email Invalid!' })

      const passwordIsValid = params.password.length < 8
      if (passwordIsValid)
        return badRequest({
          errorMessage: 'The password must be at least 8 characters long!',
        })

      const postgresEmail = new PostgresGetUserByEmailRepository()
      const emailAlreadyExists = await postgresEmail.execute(params.email)
      if (emailAlreadyExists)
        return badRequest({
          errorMessage: `The e-mail ${params.email} already in use error!`,
        })

      //chamar o service (use-case)

      const service = new CreateUserService()
      const createdUser = await service.execute(params)
      return successCreate(createdUser)
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ errorMessage: error.message })
      }
      console.log(error)
      return internalServerError()
    }
  }
}
