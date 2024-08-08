import { makeAddUserDepartmentUseCase } from "@/lib/factories/make-add-user-department-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function addUserDepartment(req: FastifyRequest, reply: FastifyReply) {
    const addUserDepartmentSchema = z.object({
        userId: z.string().uuid(),
        departmentId: z.string().uuid(),
    });

    const { userId, departmentId } = addUserDepartmentSchema.parse(req.body);

    try {
        const addUserDepartmentUseCase = makeAddUserDepartmentUseCase();
        const user = await addUserDepartmentUseCase.execute({
            userId,
            departmentId,
        });

        return reply.status(200).send(user);
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(400).send({ message: err.message });
        }
        return reply.status(500).send({ message: 'Internal server error' });
    }
}
