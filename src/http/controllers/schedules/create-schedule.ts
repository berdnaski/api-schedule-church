import { makeCreateScheduleUseCase } from "@/lib/factories/make-create-schedule-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createSchedule(req: FastifyRequest, reply: FastifyReply) {
    const createScheduleSchema = z.object({
        departmentId: z.string().uuid(),
        name: z.string().min(1),
        date: z.string().refine(val => {
            const parsedDate = new Date(val);
            return !isNaN(parsedDate.getTime()); // Verifica se a data é válida
        }, {
            message: "Invalid date format. Use 'YYYY-MM-DD'"
        }),
        time: z.string().refine(val => {
            const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
            return timeRegex.test(val);
        }, {
            message: "Invalid time format. Use 'HH:MM:SS'"
        }),
    });

    try {
        const { departmentId, name, date, time } = createScheduleSchema.parse(req.body);

        const scheduleDate = new Date(date);
        
        const [hours, minutes, seconds] = time.split(':').map(Number);
        scheduleDate.setHours(hours, minutes, seconds, 0);

        const localDate = new Date(scheduleDate.toLocaleString('en-US', { timeZone: 'UTC' }));

        const createScheduleUseCase = makeCreateScheduleUseCase();
        const schedule = await createScheduleUseCase.execute(departmentId, {
            name,
            date: localDate, 
            time
        });

        reply.status(201).send(schedule);
    } catch (error) {
        console.error(error);
        reply.status(400).send();
    }
}
