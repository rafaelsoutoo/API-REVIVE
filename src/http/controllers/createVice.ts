import z from 'zod'
import { FastifyRequest, FastifyReply } from "fastify";
import { makeViceUseCase} from '@/use-cases/factories/make-vide-use-case';
import { UserNotExistError } from '@/use-cases/error/user-error';
import { ViceExistError } from '@/use-cases/error/vice-error';

export async function createVice(request: FastifyRequest, reply: FastifyReply) {
    
    const viceCreateBodySchema = z.object({
		userId: z.string(),
		name: z.string().min(1, { message: "Name cannot be empty" }),
	});

    const { name, userId } = viceCreateBodySchema.parse(request.body);

    try {
		const createViceUserCase = makeViceUseCase()

		const vice = await createViceUserCase.execute({
			name, userId
		})

		return reply.status(201).send(vice)

	} catch (err) {
		if (err instanceof UserNotExistError) {
			return reply.status(409).send({ message: err.message })
		}
		if (err instanceof ViceExistError) {
			return reply.status(409).send({ message: err.message })
		}
		throw err
	}
}
