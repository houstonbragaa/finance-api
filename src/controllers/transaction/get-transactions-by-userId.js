import { UserNotFoundError } from '../../errors/user.js'
import {
  internalServerError,
  idIsIvalidMessage,
  requiredMissingFieldsMessage,
  checkIdIsValid,
  ok,
} from '../helpers/index.js'

export class GetTransactionsByUserIdController {
  constructor(GetTransactionsByUserIdService) {
    this.GetTransactionsByUserIdService = GetTransactionsByUserIdService
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.query.userId

      //verificar se o id foi passado como query
      if (!userId) {
        return requiredMissingFieldsMessage('userId')
      }

      //verificar se o id é válido

      const idIsValid = checkIdIsValid(userId)
      if (!idIsValid) {
        return idIsIvalidMessage()
      }

      //chamar o service

      const transactions = await this.GetTransactionsByUserIdService.execute({
        userId,
      })

      return ok(transactions)
    } catch (error) {
      console.error(error)
      if (error instanceof UserNotFoundError) {
        return idIsIvalidMessage()
      }
      return internalServerError()
    }
  }
}
