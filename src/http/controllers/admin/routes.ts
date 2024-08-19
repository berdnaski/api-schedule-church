import { verifyUserRole } from "@/http/middlewares/veriffy-user-role";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function adminRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT);

    app.get('/admin', { onRequest: [verifyUserRole('ADMIN')] }, async (req, res) => {
        return { message: 'Página Administrativa' };
    })
}