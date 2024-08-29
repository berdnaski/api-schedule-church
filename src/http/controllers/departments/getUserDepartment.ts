import { makeGetUserDepartmentUseCase } from "@/lib/factories/make-get-user-department-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getUserDepartment(req: FastifyRequest, reply: FastifyReply) {
    const getUserDepartmentSchema = z.object({
        userId: z.string().uuid(),
    });

    const { userId } = getUserDepartmentSchema.parse(req.params);

    try {
        const getUserDepartmentUseCase = makeGetUserDepartmentUseCase();
        const department = await getUserDepartmentUseCase.execute({ userId });

        if (!department) {
            return reply.status(404).send({ message: "Nenhum departamento encontrado para este usuário." });
        }

        return reply.status(200).send(department);
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(400).send({ message: err.message });
        }
    }
}
