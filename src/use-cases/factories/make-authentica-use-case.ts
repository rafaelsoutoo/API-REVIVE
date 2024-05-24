import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository() //istanciar meu repositório
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}