import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyExistsError } from '../errors/user.js'

export class CreateUserService {
  async execute(createUserParams) {
    //validar email no banco de dados
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const emailUserAlreadyExists = await getUserByEmailRepository.execute(
      createUserParams.email,
    )

    if (emailUserAlreadyExists) {
      throw new EmailAlreadyExistsError(createUserParams.email)
    }

    //gerar uuid
    const uuid = v4()

    //gerar um hash do bcrypt
    const passwordCrypted = await bcrypt.hash(createUserParams.password, 10)

    //inserir o usuário no banco de dados
    const user = {
      id: uuid,
      first_name: createUserParams.first_name,
      last_name: createUserParams.last_name,
      email: createUserParams.email,
      password: passwordCrypted,
    }

    const repository = new PostgresCreateUserRepository()
    const result = await repository.execute(user)
    return result
  }
}
