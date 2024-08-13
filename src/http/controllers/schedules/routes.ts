import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createSchedule } from "./create-schedule";
import { editSchedule } from "./edit-schedule";

export async function schedulesRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT);
    // Authenticated
    app.post('/schedules', createSchedule);
    app.put('/schedules/:scheduleId', editSchedule);
}