import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './error/user-error'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {  //para se autenticar na aplicação
    email: string
    password: string
}



interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) { }  //dependencia do banco de dados

    async execute({   //execute recebe esses dois parametros
        email,
        password,                           //devolve uma resposta
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {


        const [user] = await Promise.all([
            this.usersRepository.findByEmail(email),

        ]); // busca um usuário no repositório de usuários usando o e-mail fornecido.

        if (!user) {
            throw new InvalidCredentialsError();

        }


        if (!user || !user.password_hash) {
            throw new InvalidCredentialsError();
        }

        //se o usuário existir , compara a senha  ,  booleano
        const doestPasswordMatches = await compare(password, user.password_hash)

        if (!doestPasswordMatches) { //se as senhas não baterem
            throw new InvalidCredentialsError()
        }

        return {
            user,
        }
    }
}