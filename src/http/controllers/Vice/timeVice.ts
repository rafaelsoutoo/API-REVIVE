import { ViceNoExistError } from "@/use-cases/error/vice-error";
import { makeFindTimeViceUseCase } from "@/use-cases/factories/make-find-time-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function FindTime(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        viceId: z.string()
    });

    const bodySchema = z.object({
        reset: z.boolean().optional().default(false)
    });

    try {
        const { viceId } = paramsSchema.parse(request.params);
        const { reset } = bodySchema.parse(request.body);

        const useCase = makeFindTimeViceUseCase();
        const { date, timeInSeconds } = await useCase.execute(viceId, reset);

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
