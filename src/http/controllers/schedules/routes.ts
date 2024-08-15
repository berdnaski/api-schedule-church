import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createSchedule } from "./create-schedule";
import { editSchedule } from "./edit-schedule";
import { deleteSchedule } from "./delete-schedule";
import { addScheduleParticipant } from "./add-participant-schedule";
import { updateParticipantStatus } from "./update-participant-status";
import { removeParticipantSchedule } from "./remove-participant-schedule";
import { verifyUserRole } from "@/http/middlewares/veriffy-user-role";
import { listSchedules } from "./list-schedules";

export async function schedulesRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT);
    // Authenticated
    app.post('/schedules', createSchedule);
    app.put('/schedules/:scheduleId', editSchedule);
    app.delete('/schedules/:scheduleId', deleteSchedule);
    app.post('/schedules/:scheduleId/participants', addScheduleParticipant);
    app.post('/schedule/participant/status', updateParticipantStatus);
    app.delete('/schedules/:scheduleId/participants/:userId/remove', { onRequest: [verifyUserRole('ADMIN', 'LEADER')] }, removeParticipantSchedule);
    app.get('/schedules', listSchedules);
}
