import { makeListLeaderRequestsUseCase } from "@/lib/factories/make-list-leader-request-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function listLeaderRequests(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listLeaderRequestsUseCase = makeListLeaderRequestsUseCase();
    const leaderRequests = await listLeaderRequestsUseCase.execute();

    return reply.status(200).send(leaderRequests);
  } catch (error) {
    console.error(error);
    return reply
      .status(500)
      .send({ message: "Failed to list leader requests" });
  }
}
