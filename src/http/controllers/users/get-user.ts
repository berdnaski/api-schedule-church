import { makeGetUserUseCase } from "@/lib/factories/make-get-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getUser(req: FastifyRequest, reply: FastifyReply) {
    const userId = req.user.sub;
    const getUserUseCase = makeGetUserUseCase();

    try {
        const user = await getUserUseCase.execute(userId);
        return reply.status(200).send(user);
    } catch(error) {
        return reply.status(400).send({ message: "Invalid user ID." });
    }
}