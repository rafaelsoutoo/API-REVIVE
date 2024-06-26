import fastify from "fastify";
import fastifyJwt from '@fastify/jwt'


import { ZodError } from 'zod'
import { env } from '@/env'

import { appRoutes } from "./http/controllers/routes";


import { FastifyReply, FastifyRequest } from 'fastify'
import { viceRoutes } from "./http/controllers/Vice/routes";


export const app = fastify()


app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '7d', //expiração do token original, 10 min
    },
})


app.register(appRoutes, viceRoutes)



app.setErrorHandler((error, _, reply) => {  //função que lida com erros 


    if (error instanceof ZodError) {  //for de erro de validação
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})