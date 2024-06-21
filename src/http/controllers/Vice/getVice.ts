import { UserNotExistError } from "@/use-cases/error/user-error";
import { ViceNoExistError } from "@/use-cases/error/vice-error";
import { makeGetViceUseCase } from "@/use-cases/factories/make-get-vice-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function getViceByUSerId(request: FastifyRequest, reply: FastifyReply) {
    const getQuerySchema = z.object({
        userId: z.string(),
    });

    const { userId } = getQuerySchema.parse(request.params)

    try {
        const useCase = makeGetViceUseCase()

        const vices = await useCase.execute(userId)

        return reply.status(200).send(vices)
    } catch (error) {
        if (error instanceof UserNotExistError || error instanceof ViceNoExistError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}
