import { ViceNoExistError } from "@/use-cases/error/vice-error";
import { makeFindTimeViceUseCase } from "@/use-cases/factories/make-find-time-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function FindTime(request: FastifyRequest, reply: FastifyReply) {
    const getQuerySchema = z.object({
        viceId: z.string()
    });

    try {
        const { viceId } = getQuerySchema.parse(request.params);

        const useCase = makeFindTimeViceUseCase();
        const { date, timeInSeconds } = await useCase.execute(viceId);

        const response = {
            date,
            timeInSeconds
        };

        return reply.status(200).send(response);
    } catch (error) {
        if (error instanceof ViceNoExistError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}