import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";

export async function authRoutes(app: FastifyInstance) {
    app.post('/login', authenticate);

    app.patch('/token/refresh', refresh);
}