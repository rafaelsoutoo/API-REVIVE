import z from 'zod';
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateEconomyUseCase } from '@/use-cases/factories/make-create-economy-use-case';
import { ViceNoExistError } from '@/use-cases/error/vice-error';

export async function createEconomy(request: FastifyRequest, reply: FastifyReply) {
  const economyCreateBodySchema = z.object({
    unit: z.number().min(1, { message: "Unit cannot be empty" }),
    originalAmount: z.number().min(1, { message: "Amount cannot be empty" }),
  });

  try {
    const { originalAmount, unit } = economyCreateBodySchema.parse(request.body);

    const createEconomyUserCase = makeCreateEconomyUseCase();

    const economy = await createEconomyUserCase.execute({
      unit,
      originalAmount,
    });

    return reply.status(201).send(economy);

  } catch (err) {
    if (err instanceof ViceNoExistError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }
}
