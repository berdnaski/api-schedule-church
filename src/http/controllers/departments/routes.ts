import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createDepartment } from "./create-department";
import { verifyUserRole } from "@/http/middlewares/veriffy-user-role";
import { addUserDepartment } from "./add-user-department";
import { listUsersByDepartment } from "./list-user-by-department";
import { deleteDepartment } from "./delete-department";
import { removeUserDepartment } from "./remove-user-department";
import { editDepartment } from "./edit-department";
import { getUserDepartment } from "./getUserDepartment";


export async function departmentsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT);
    // Authenticated

    app.post('/departments/create', { onRequest: [verifyUserRole('ADMIN', 'LEADER')] }, createDepartment);
    app.post('/users/department', { onRequest: [verifyUserRole('ADMIN', 'LEADER')]}, addUserDepartment);
    app.get('/departments/:departmentId/users', listUsersByDepartment);

    app.delete('/departments/:departmentId', { onRequest: [verifyUserRole('ADMIN')] }, deleteDepartment);
    app.delete('/users/:userId/departments/:departmentId', removeUserDepartment);

    app.put('/departments/:departmentId', { onRequest: [verifyUserRole('ADMIN')] }, editDepartment);

    app.get('/departments/user/:userId', getUserDepartment);


}