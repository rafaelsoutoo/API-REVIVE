import { FastifyInstance } from "fastify";
import { createVice } from "./createVice";
import { getViceByUSerId } from "./getVice";
import { FindTime } from "./timeVice";
import { createEconomy } from "./createEconomyVice";
import { updateAmount } from "./updateAmount"; 

export async function viceRoutes(app: FastifyInstance) {
    app.post('/create/vice/:userId', createVice);
    app.get('/get/vice/:userId', getViceByUSerId);
    app.patch('/time/vice/:viceId', FindTime);
    app.post('/create/economy/:vice_id', createEconomy)
    app.patch('/amount/:economy_id', updateAmount)
}
