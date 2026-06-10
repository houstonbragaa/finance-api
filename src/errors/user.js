export class EmailAlreadyInUseError extends Error {
  constructor(email) {
    super(`The e-mail ${email} already exists!`)
    this.name = 'EmailAlreadyInUseError'
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super(`User not found!`)
    this.name = 'UserNotFoundError'
  }
}
