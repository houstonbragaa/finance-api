import bcrypt from 'bcrypt'

import { EmailAlreadyInUseError } from '../errors/user.js'

export class UpdateUserService {
  constructor(PostgresUpdateUserRepository, PostgresGetUserByEmailRepository) {
    this.PostgresUpdateUserRepository = PostgresUpdateUserRepository
    this.PostgresGetUserByEmailRepository = PostgresGetUserByEmailRepository
  }

  async execute(userId, params) {
    // verificar se o email ja existe
    if (params.email) {
      const emailUserAlreadyExists =
        await this.PostgresGetUserByEmailRepository.execute(params.email)

      if (emailUserAlreadyExists && emailUserAlreadyExists.id !== userId) {
        throw new EmailAlreadyInUseError(params.email)
      }
    }
    //se mudar a senha, criptografa-lo

    const user = {
      ...params,
    }

    if (params.password) {
      const passwordCrypted = await bcrypt.hash(params.password, 10)

      user.password = passwordCrypted
    }

    //chamar o repository

    const result = await this.PostgresUpdateUserRepository.execute(userId, user)

    return result
  }
}
