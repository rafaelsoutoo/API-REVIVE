import z from 'zod'
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateViceUseCase } from '@/use-cases/factories/make-create-vice-use-case'; 
import { UserNotExistError } from '@/use-cases/error/user-error';
import { ViceExistError } from '@/use-cases/error/vice-error';

export async function createVice(request: FastifyRequest, reply: FastifyReply) {
    
    const viceCreateParmsSchema = z.object({
		userId: z.string(),
	});

    const viceCreateBodySchema = z.object({
		name: z.string().min(1, { message: "Name cannot be empty" }),
	});

    try {
		const {userId} = viceCreateParmsSchema.parse(request.params)
		const { name } = viceCreateBodySchema.parse(request.body);
		
		const createViceUserCase = makeCreateViceUseCase()

		const vice = await createViceUserCase.execute({
			name, userId
		})

		return reply.status(201).send(vice)

	} catch (err) {
		if (err instanceof UserNotExistError || err instanceof ViceExistError) {
			return reply.status(409).send({ message: err.message })
		}
		throw err
	}
}
