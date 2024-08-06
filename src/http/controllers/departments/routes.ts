import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createDepartment } from "./create-department";
import { verifyUserRole } from "@/http/middlewares/veriffy-user-role";


export async function departmentsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT);
    // Authenticated

    app.post('/departments', { onRequest: [verifyUserRole('ADMIN')]}, createDepartment);
}