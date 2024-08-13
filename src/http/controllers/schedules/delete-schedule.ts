import { makeDeleteScheduleUseCase } from "@/lib/factories/make-delete-schedule-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteSchedule(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const deleteScheduleScheam = z.object({
        scheduleId: z.string().uuid(),
    });

    try {
        const { scheduleId } = deleteScheduleScheam.parse(req.params);

        const deleteScheduleUseCase = makeDeleteScheduleUseCase();

        await deleteScheduleUseCase.execute(scheduleId);

        reply.status(204).send();
    } catch(error) {
        reply.status(404).send({ message: "Schedule not found" });
    }
}