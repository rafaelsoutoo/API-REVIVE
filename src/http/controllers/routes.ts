import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { createVice } from "./createVice";

export async function appRoutes(app: FastifyInstance) {
    app.post("/sessions", authenticate);

    app.post('/users', register)

    app.post('/create/vice/:userId', createVice)
}