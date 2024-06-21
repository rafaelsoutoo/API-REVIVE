import { EconomyNotExistError } from "@/use-cases/error/economy-errors";
import { makeUpdateAmountUseCase } from "@/use-cases/factories/make-update-amount-use-case"; 
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateAmount(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        economy_id: z.string()
    });

    try {
        const { economy_id } = paramsSchema.parse(request.params);

        const useCase = makeUpdateAmountUseCase();
        const newAmount = await useCase.execute(economy_id);

        return reply.status(200).send({ amount: newAmount });
    } catch (error) {
        if (error instanceof EconomyNotExistError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}
