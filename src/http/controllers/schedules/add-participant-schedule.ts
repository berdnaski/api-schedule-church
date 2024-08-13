import { makeAddParticipantScheduleUseCase } from "@/lib/factories/make-add-participant-schedule-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function addScheduleParticipant(req: FastifyRequest, reply: FastifyReply) {
    const addScheduleParticipantSchema = z.object({
        userId: z.string().uuid(),
        scheduleId: z.string().uuid(),
    });

    try {
        const { userId, scheduleId } = addScheduleParticipantSchema.parse(req.body);

        const addScheduleParticipantUseCase = makeAddParticipantScheduleUseCase();
        await addScheduleParticipantUseCase.execute(scheduleId, userId);

        reply.status(200).send({ message: "Participant added successfully." });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        } else {
            reply.status(500).send({ message: "Internal server error" });
        }
    }
}
