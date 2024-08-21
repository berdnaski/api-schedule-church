import { createUpdateLeaderRequestUseCase } from "@/lib/factories/create-update-leader-request-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const updateLeaderRequestSchema = z.object({
    id: z.string().uuid(),
    status: z.enum(['ACCEPTED', 'REJECTED']),
});

export async function updateLeaderRequest(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id, status } = updateLeaderRequestSchema.parse(req.body);

        const requestUserId = req.user.sub;

        const updateLeaderRequestUseCase = createUpdateLeaderRequestUseCase();
        await updateLeaderRequestUseCase.execute({
            id,
            status,
            requestUserId,
        });

        return reply.status(200).send();
    } catch (error) {
        console.error(error);
        reply.status(400).send({ message: "Invalid request data." });
    }
}
