import { makeRemoveUserDepartmentUseCase } from "@/lib/factories/make-remove-user-department-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function removeUserDepartment(req: FastifyRequest, reply: FastifyReply) {
    const removeUserDepartmentSchema = z.object({
        userId: z.string().uuid(),
        departmentId: z.string().uuid()
    });

    try {
        const { userId, departmentId } = removeUserDepartmentSchema.parse(req.params);

        const removeUserDepartmentUseCase = makeRemoveUserDepartmentUseCase();
        
        await removeUserDepartmentUseCase.execute(userId, departmentId);

        return reply.status(204).send();
    } catch(error) {
        reply.status(400).send({ message: "User or department not found" });
    }
}