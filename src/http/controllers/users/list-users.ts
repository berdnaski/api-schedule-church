import { makeListUsersUseCase } from "@/lib/factories/make-list-users-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function listUsers(req: FastifyRequest, reply: FastifyReply) {
    const listUsersUseCase = makeListUsersUseCase();
    const { users } = await listUsersUseCase.execute();

    return reply.status(200).send({ users });
}
