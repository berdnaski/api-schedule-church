import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createDepartment } from "./create-department";
import { verifyUserRole } from "@/http/middlewares/veriffy-user-role";
import { addUserDepartment } from "./add-user-department";
import { listUsersByDepartment } from "./list-user-by-department";


export async function departmentsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT);
    // Authenticated

    app.post('/departments', { onRequest: [verifyUserRole('ADMIN')]}, createDepartment);
    app.post('/users/department', { onRequest: [verifyUserRole('ADMIN', 'LEADER')]}, addUserDepartment);
    app.get('/departments/:departmentId/users', listUsersByDepartment);
}