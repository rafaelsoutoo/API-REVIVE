import { FastifyInstance } from "fastify";
import { createVice } from "./createVice";
import { getViceByUSerId } from "./getVice";
import { FindTime } from "./timeVice";

export async function viceRoutes(app: FastifyInstance) {
    app.post('/create/vice/:userId', createVice);
    app.get('/get/vice/:userId', getViceByUSerId);
    app.patch('/time/vice/:viceId', FindTime);
}
