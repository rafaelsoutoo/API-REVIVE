import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authentica-use-case'
import { InvalidCredentialsError } from '@/use-cases/error/user-error'


export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const authenticateBodySchema = z.object({
        email: z
            .string()
            .min(1, { message: "This field has to be filled." })
            .email("This is not a valid email."),
        password: z.string().min(6, { message: "Password must be at least 6 characters long." })
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthenticateUseCase()

        const { user } = await authenticateUseCase.execute({
            email,
            password
        })


        const token = await reply.jwtSign(
            {
                role: user.role,
            },
            {
                sign: {
                    sub: user.id,
                },
            },
        )



        return reply.status(200).send({
            user,
            token,
        });


    } catch (err) {
        if (err instanceof InvalidCredentialsError) {  //se for um erro do erro personalizado
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }


}