// No backend - dashboard.ts
import { makeGetUserDashboardUseCase } from "@/lib/factories/make-get-user-dashboard-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function dashboard(req: FastifyRequest, reply: FastifyReply) {
  const getUserDashboard = makeGetUserDashboardUseCase();

  const { user } = await getUserDashboard.execute({
    userId: req.user.sub,
  });

  return reply.status(200).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}
