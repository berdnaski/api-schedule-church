import { FastifyReply, FastifyRequest } from "fastify";
import { CreateLeaderRequestUseCase } from "@/use-cases/leader-request/create-leader-request-use-case";
import { createLeaderRequestFactory } from "@/lib/factories/create-leader-request-use-case";

interface CreateLeaderRequestBody {
  id: string;
}

export async function createLeaderRequest(req: FastifyRequest<{ Body: CreateLeaderRequestBody }>, reply: FastifyReply) {
  const { id } = req.body;

  try {
    const createLeaderRequestUseCase = createLeaderRequestFactory();
    const leaderRequest = await createLeaderRequestUseCase.execute({ id });
    reply.status(201).send(leaderRequest);
  } catch (error) {
    console.error('Error creating leader request:', error);
    reply.status(400).send({ message: 'Failed to create leader request.' });
  }
}
