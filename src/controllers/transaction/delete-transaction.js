import { internalServerError } from '../helpers/http.js'
import { transactionNotFound } from '../helpers/transaction.js'

export class DeleteTransactionController {
  constructor(deleteTransactionService) {
    this.deleteTransactionService = deleteTransactionService
  }

  async execute(httpRequest) {
    try {
      const transactionId = httpRequest.params.transactionId

      const deletedTransaction =
        await this.deleteTransactionService.execute(transactionId)

      if (!deletedTransaction) {
        return transactionNotFound()
      }

      return deletedTransaction
    } catch (error) {
      console.log(error)
      return internalServerError()
    }
  }
}
