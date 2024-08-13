import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeEditScheduleUseCase } from "@/lib/factories/make-edit-schedule-use-case";
import { EditScheduleDTO } from "@/use-cases/dtos/edit-schedule-dto";

export async function editSchedule(req: FastifyRequest<{ Params: { scheduleId: string } }>, reply: FastifyReply) {
    const editScheduleSchema = z.object({
        name: z.string().min(1).optional(),
        date: z.string().optional(),  // Usa string para validação
        time: z.string().optional()   // Usa string para validação
    });

    try {
        const { scheduleId } = req.params;
        const parsedData = editScheduleSchema.parse(req.body);

        // Montando o objeto de dados para atualizar
        const updatedData: Partial<EditScheduleDTO> = {};
        if (parsedData.name) {
            updatedData.name = parsedData.name;
        }
        if (parsedData.date) {
            updatedData.date = new Date(parsedData.date);  // Converte para Date
        }
        if (parsedData.time) {
            updatedData.time = new Date(`1970-01-01T${parsedData.time}Z`).toISOString(); // Converte para string no formato ISO
        }

        const editScheduleUseCase = makeEditScheduleUseCase();
        await editScheduleUseCase.execute(scheduleId, updatedData);

        reply.status(200).send({ message: "Schedule updated successfully." });
    } catch (error) {
        console.error("Error details:", error); // Adicione logs detalhados
        reply.status(400).send({ error: "Invalid request data or schedule not found." });
    }
}
