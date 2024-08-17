import { FastifyInstance } from "fastify";
import { dashboard } from "./dashboard";
import { listUsers } from "./list-users";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { register } from "./register";
import { verifyUserRole } from "@/http/middlewares/veriffy-user-role";
import { updateUserRole } from "./updated-user-role";


export async function usersRoutes(app: FastifyInstance) {
    app.post('/register', register);

    app.addHook('onRequest', verifyJWT);
    // Authenticated
    app.get('/dashboard', dashboard);

    app.get('/users', { onRequest: [verifyUserRole('ADMIN')] }, listUsers);

    app.patch('/users/update-role', { onRequest: [verifyUserRole('ADMIN')]}, updateUserRole);
}