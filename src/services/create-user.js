import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserService {
  constructor(PostgresCreateUserRepository) {
    this.PostgresCreateUserRepository = PostgresCreateUserRepository
  }

  async execute(params) {
    //validar email no banco de dados
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const emailUserAlreadyExists = await getUserByEmailRepository.execute(
      params.email,
    )

    if (emailUserAlreadyExists) {
      throw new EmailAlreadyInUseError(params.email)
    }

    //gerar uuid
    const uuid = v4()

    //gerar um hash do bcrypt
    const passwordCrypted = await bcrypt.hash(params.password, 10)

    //inserir o usuário no banco de dados
    const user = {
      id: uuid,
      first_name: params.first_name,
      last_name: params.last_name,
      email: params.email,
      password: passwordCrypted,
    }

    const result = await this.PostgresCreateUserRepository.execute(user)
    return result
  }
}
