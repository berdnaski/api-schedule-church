import fastify from "fastify";
import fastifyCookie from '@fastify/cookie'
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { usersRoutes } from "./http/controllers/users/routes";
import { authRoutes } from "./http/controllers/auth/routes";
import { departmentsRoutes } from "./http/controllers/departments/routes";
import { schedulesRoutes } from "./http/controllers/schedules/routes";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '10m',
    }
})

app.register(fastifyCookie);

app.register(usersRoutes);

app.register(authRoutes);

app.register(departmentsRoutes);

app.register(schedulesRoutes);

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError) {
        return reply.status(400).send({ message: 'Validation error.', issues: error.format() });
    }

    if(env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
        
    }

    return reply.status(500).send( { message: 'Internal server error.' })
})



