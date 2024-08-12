import { makeCreateDepartmentsUseCase } from "@/lib/factories/make-create-departments-use-case";
import { makeListUsersByDepartmentUseCase } from "@/lib/factories/make-list-users-by-departments-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listUsersByDepartment(req: FastifyRequest, reply: FastifyReply) {
    const departmentIdSchema = z.object({
        departmentId: z.string().uuid()
    });

    try {
        const { departmentId } = departmentIdSchema.parse(req.params);

        const listUsersByDepartmentUseCase = makeListUsersByDepartmentUseCase();

        const users = await listUsersByDepartmentUseCase.execute(departmentId);

        return reply.status(200).send(users);
    } catch (error) {
        reply.status(400).send();
    }
}