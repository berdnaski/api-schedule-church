import { verifyUserRole } from "@/http/middlewares/veriffy-user-role";
import { updateLeaderRequest } from "./update-leader-request";
import { createLeaderRequest } from "./create-leader-request";
import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function leaderRequestRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT); // Middleware global para autenticação JWT

    app.post('/leader-requests', createLeaderRequest);
    app.put('/leader-requests/:id', { onRequest: verifyUserRole('ADMIN') }, updateLeaderRequest);
}
