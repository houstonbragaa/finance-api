export class EmailAlreadyExistsError extends Error {
  constructor(email) {
    super(`The e-mail ${email} already exists!`)
    this.name = 'EmailAlreadyInUseError'
  }
}
