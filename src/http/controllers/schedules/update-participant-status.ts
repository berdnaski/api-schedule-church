import { makeUpdateParticipantStatusUseCase } from "@/lib/factories/make-update-participant-status-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateParticipantStatus(req: FastifyRequest, reply: FastifyReply) {
    const updateParticipantStatusSchema = z.object({
        userId: z.string().uuid(),
        scheduleId: z.string().uuid(),
        status: z.enum(['ACCEPTED', 'REJECTED'])
    });

    try {
        const { userId, scheduleId, status } = updateParticipantStatusSchema.parse(req.body);

        const requestUserId = req.user.sub;

        const updateStatusUseCase = makeUpdateParticipantStatusUseCase();

        await updateStatusUseCase.execute(scheduleId, userId, status, requestUserId);

        reply.status(200).send({ message: "Participant status updated successfully." });
    } catch (error) {
        if(error instanceof Error) {
            reply.status(400).send({ message: error.message });
        } else {
            reply.status(500).send({ message: "Internal server error" });
        }
    }
}