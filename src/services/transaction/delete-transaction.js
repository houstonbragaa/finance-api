export class DeleteTransactionService {
  constructor(deleteTransactionRepository) {
    this.deleteTransactionRepository = deleteTransactionRepository
  }

  async execute(transactionId) {
    const deletedTransaction =
      await this.deleteTransactionRepository.execute(transactionId)

    return deletedTransaction
  }
}
