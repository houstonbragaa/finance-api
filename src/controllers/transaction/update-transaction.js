import {
  badRequest,
  checkAmountIsValid,
  checkIdIsValid,
  checkRequiredTypeMessage,
  checkTypeIsValid,
  checkValidCurrencyMessage,
  idIsIvalidMessage,
  internalServerError,
  ok,
} from '../helpers/index.js'

export class UpdateTransactionController {
  constructor(updateTransactionService) {
    this.updateTransactionService = updateTransactionService
  }
  async execute(httpRequest) {
    try {
      const idIsvalid = checkIdIsValid(httpRequest.params.transactionId)

      if (!idIsvalid) {
        return idIsIvalidMessage()
      }

      const params = httpRequest.body

      const allowedFields = ['name', 'amount', 'date', 'type']

      const someFieldsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      )

      if (someFieldsNotAllowed) {
        return badRequest({
          message: 'some provided field is not allowed',
        })
      }

      if (params.amount) {
        const amountIsValid = checkAmountIsValid(params.amount)

        if (!amountIsValid) {
          return checkValidCurrencyMessage()
        }
      }

      if (params.type) {
        const typeIsValid = checkTypeIsValid(params.type)

        if (!typeIsValid) {
          return checkRequiredTypeMessage()
        }
      }

      const transaction = await this.updateTransactionService(
        httpRequest.params.transactionId,
        params,
      )

      return ok(transaction)
    } catch (error) {
      console.error(error)
      return internalServerError
    }
  }
}
