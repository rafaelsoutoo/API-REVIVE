import z from 'zod'
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateEconomyUseCase } from '@/use-cases/factories/make-create-economy-use-case'; 
import { ViceNoExistError } from '@/use-cases/error/vice-error';

export async function createEconomy(request: FastifyRequest, reply: FastifyReply) {
    
    const economyCreateParmsSchema = z.object({
		vice_id: z.string(),
	});

    const economyCreateBodySchema = z.object({
		amount: z.number().min(1, { message: "Name cannot be empty" }),
	});

    try {
		const {vice_id} = economyCreateParmsSchema.parse(request.params)
		const { amount } = economyCreateBodySchema.parse(request.body);
		
		const createEconomyUserCase = makeCreateEconomyUseCase()

		const economy = await createEconomyUserCase.execute({
			vice_id, amount
		})

		return reply.status(201).send(economy)

	} catch (err) {
		if (err instanceof ViceNoExistError) {
			return reply.status(409).send({ message: err.message })
		}
		throw err
	}
}
