export class EmailAlreadyInUseError extends Error {
  constructor(email) {
    super(`The e-mail ${email} already exists!`)
    this.name = 'EmailAlreadyInUseError'
  }
}
