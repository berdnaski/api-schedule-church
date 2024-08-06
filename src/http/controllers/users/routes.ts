import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { dashboard } from "./dashboard";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";
import { listUsers } from "./list-users";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)

    app.post('/login', authenticate);

    app.patch('/token/refresh', refresh);

    // Authenticated
    app.get('/dashboard', { onRequest: [verifyJWT] }, dashboard);

    app.get('/users', { onRequest: [verifyJWT] }, listUsers);
}