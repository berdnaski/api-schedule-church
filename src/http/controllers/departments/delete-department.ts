import { makeDeleteDepartmentUseCase } from "@/lib/factories/make-delete-department-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteDepartment(req: FastifyRequest, reply: FastifyReply) {
    const deleteDepartmentSchema = z.object({
        departmentId: z.string().uuid()
    });

    try {
        const { departmentId } = deleteDepartmentSchema.parse(req.params);

        const deleteDepartmentUseCase = makeDeleteDepartmentUseCase();

        await deleteDepartmentUseCase.execute(departmentId);

        reply.status(204).send();
    } catch(error) {
        reply.status(404).send({ message: "Department not found or invalid data." });
    }
}