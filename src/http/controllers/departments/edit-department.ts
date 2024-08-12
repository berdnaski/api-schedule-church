import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeEditDepartmentUseCase } from "@/lib/factories/make-edit-department-use-case";

export async function editDepartment(req: FastifyRequest, reply: FastifyReply) {
    const editDepartmentSchema = z.object({
        name: z.string().min(1),
        description: z.string().optional(),
    });

    try {
        const { departmentId } = req.params as { departmentId: string };
        const { name, description } = editDepartmentSchema.parse(req.body);

        const editDepartmentUseCase = makeEditDepartmentUseCase();

        await editDepartmentUseCase.execute(departmentId, { name, description });

        reply.status(200).send({ message: "Department updated successfully." });
    } catch (error) {
        console.error(error); 
        reply.status(400).send({ error: "Invalid request data or department not found." });
    }
}
