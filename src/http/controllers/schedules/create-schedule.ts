import { makeCreateScheduleUseCase } from "@/lib/factories/make-create-schedule-use-case";
import { dateSchema, timeSchema } from "@/lib/interfaces/validation";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createSchedule(req: FastifyRequest, reply: FastifyReply) {
    const createScheduleSchema = z.object({
        departmentId: z.string().uuid(),
        name: z.string().min(1),
        date: dateSchema,
        time: timeSchema,
    });

    try {
        const { departmentId, name, date, time } = createScheduleSchema.parse(req.body);

        const scheduleDate = new Date(date);
        
        const [hours, minutes, seconds] = time.split(':').map(Number);
        scheduleDate.setHours(hours, minutes, seconds, 0);

        const localDate = new Date(scheduleDate.toLocaleString('en-US', { timeZone: 'UTC' }));

        const createScheduleUseCase = makeCreateScheduleUseCase();
        const schedule = await createScheduleUseCase.execute({
            departmentId,
            name,
            date: localDate, 
            time
        });

        reply.status(201).send(schedule);
    } catch (error) {
        console.error(error);
        reply.status(400).send({ message: "Invalid request data." });
    }
}
