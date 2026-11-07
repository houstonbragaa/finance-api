import {
  badRequest,
  internalServerError,
  successCreate,
} from '../helpers/http.js'
import { checkAmountIsValid } from '../helpers/transaction.js'
import { checkIdIsValid, idIsIvalidMessage } from '../helpers/user.js'

export class CreateTransactionController {
  constructor(createTransactionService) {
    this.createTransactionService = createTransactionService
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const requiredFields = ['user_id', 'name', 'amount', 'date', 'type']

      for (const field of requiredFields) {
        if (!params[field] || params[field].toString().trim().length === 0) {
          return badRequest({ message: `Missing fields: ${field}` })
        }
      }

      const idIsValid = checkIdIsValid(params.user_id)
      if (!idIsValid) return idIsIvalidMessage()

      if (params.amount <= 0) {
        return badRequest({
          message: `The amount must be greater than 0`,
        })
      }

      const amountIsValid = checkAmountIsValid(params.amount.toString())
      if (!amountIsValid) {
        return badRequest({
          message: `The amount must be a valid currency`,
        })
      }

      const type = params.type.trim().toUpperCase()

      const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)
      if (!typeIsValid) {
        return badRequest({
          message: `The type is invalid`,
        })
      }

      const transaction = await this.createTransactionService.execute({
        ...params,
        type,
      })
      console.log('transação criada')
      console.log(transaction)
      return successCreate(transaction)
    } catch (error) {
      console.error(error)
      return internalServerError()
    }
  }
}
