import { makeGetUserDashboardUseCase } from "@/use-cases/factories/make-get-user-dashboard-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function dashboard(req: FastifyRequest, reply: FastifyReply) {
    const getUserDashboard = makeGetUserDashboardUseCase();

    const { user } = await getUserDashboard.execute({
        userId: req.user.sub,
    })
    
    return reply.status(200).send({
        user: {
            ...user,
            password_hash: undefined,
        },
    });
}