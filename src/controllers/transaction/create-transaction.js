import { internalServerError, successCreate } from '../helpers/http.js'
import {
  checkAmountIsValid,
  checkRequiredTypeMessage,
  checkTypeIsValid,
  checkValidCurrencyMessage,
} from '../helpers/transaction.js'
import {
  checkIdIsValid,
  idIsIvalidMessage,
  requiredMissingFieldsMessage,
  validadeRequiredFields,
} from '../helpers/validators.js'

export class CreateTransactionController {
  constructor(createTransactionService) {
    this.createTransactionService = createTransactionService
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const requiredFields = ['user_id', 'name', 'amount', 'date', 'type']

      const { ok, missingField } = validadeRequiredFields(
        params,
        requiredFields,
      )
      if (!ok) return requiredMissingFieldsMessage(missingField)

      const idIsValid = checkIdIsValid(params.user_id)
      if (!idIsValid) return idIsIvalidMessage()

      const amountIsValid = checkAmountIsValid(params.amount)
      if (!amountIsValid) return checkValidCurrencyMessage()

      const type = params.type.trim().toUpperCase()

      const typeIsValid = checkTypeIsValid(type)
      if (!typeIsValid) return checkRequiredTypeMessage()

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
