import { makeRemoveParticipantScheduleUseCase } from "@/lib/factories/make-remove-participant-schedule-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function removeParticipantSchedule(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { userId, scheduleId } = req.params as { userId: string; scheduleId: string };

        const removeParticipantUseCase = makeRemoveParticipantScheduleUseCase();
        await removeParticipantUseCase.execute(scheduleId, userId);

        reply.status(204).send(); 
    } catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        } else {
            reply.status(500).send({ message: "Internal server error" });
        }
    }
}
