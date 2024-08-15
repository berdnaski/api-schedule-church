import { makeListScheduleUseCase } from "@/lib/factories/make-list-schedule-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listSchedules(req: FastifyRequest, reply: FastifyReply) {
    const listSchedulesSchema = z.object({
        departmentId: z.string().uuid().optional(), 
    });

    try {
        const { departmentId } = listSchedulesSchema.parse(req.query);

        const listSchedulesUseCase = makeListScheduleUseCase();

        const result = await listSchedulesUseCase.execute(departmentId);

        reply.status(200).send(result);
    } catch (error) {
        console.error(error);
        reply.status(400).send({ message: "Invalid request data." });
    }
}
