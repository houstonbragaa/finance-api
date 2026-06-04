import { CreateUserService } from '../services/create-user.js'
import { badRequest, internalServerError, successCreate } from './helper.js'
import validator from 'validator'

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      //validar campos

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

      //chamar o service (use-case)

      const service = new CreateUserService()
      const createdUser = await service.execute(params)
      return successCreate(createdUser)
    } catch (error) {
      console.log(error)
      return internalServerError()
    }
  }
}
