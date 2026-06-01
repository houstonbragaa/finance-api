import { CreateUserService } from '../services/create-user.js'

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      //validar campos obrigatórios e vazios

      const fieldsList = ['first_name', 'last_name', 'email', 'password']

      for (const field of fieldsList) {
        if (!params[field] || params[field].trim().length === 0) {
          return {
            statusCode: 400,
            body: {
              errorMessage: `Missing field ${field}`,
            },
          }
        }
      }

      //chamar o service (use-case)

      const service = new CreateUserService()
      const createdUser = await service.execute(params)
      return {
        statusCode: 201,
        body: createdUser,
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 500,
        body: {
          errorMessage: 'Internal server error',
        },
      }
    }
  }
}
