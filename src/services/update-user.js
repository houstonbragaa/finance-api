import bcrypt from 'bcrypt'

import { EmailAlreadyInUseError } from '../errors/user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js'

export class UpdateUserService {
  async execute(userId, params) {
    // verificar se o email ja existe
    if (params.email) {
      const emailRepository = new PostgresGetUserByEmailRepository()
      const emailUserAlreadyExists = await emailRepository.execute(params.email)

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

    const updateUserRepository = new PostgresUpdateUserRepository()
    const result = await updateUserRepository.execute(userId, user)

    return result
  }
}
