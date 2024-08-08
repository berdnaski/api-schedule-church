import { UnauthorizedError } from "@/lib/errors/unauthorized-error";
import { makeUpdateUserRoleUseCase } from "@/lib/factories/make-update-user-role-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateUserRole(req: FastifyRequest, reply: FastifyReply) {
    const updateUserRoleSchema = z.object({
        userId: z.string().uuid(),
        newRole: z.enum(['ADMIN', 'MEMBER', 'LEADER']),
    });

    const { userId, newRole } = updateUserRoleSchema.parse(req.body);
    const adminId = req.user.sub;

    try {
        const updateUserRoleUseCase = makeUpdateUserRoleUseCase();
        const { user } = await updateUserRoleUseCase.execute({
            userId,
            newRole,
            adminId,
        });

        return reply.status(200).send({ user });
    } catch (err) {
        if(err instanceof UnauthorizedError) {
            return reply.status(400).send({ message: err.message });
        }
    }
}