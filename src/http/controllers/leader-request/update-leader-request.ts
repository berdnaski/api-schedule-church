import { createUpdateLeaderRequestUseCase as makeUpdateLeaderRequestUseCase } from "@/lib/factories/make-update-leader-request-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const updateLeaderRequestSchema = z.object({
  id: z.string().uuid(),
  isAccepted: z.union([z.boolean(), z.string()]).transform((val) => {
    if (typeof val === "boolean") return val;
    return val.toUpperCase() === "ACCEPTED";
  }),
});

export async function updateLeaderRequest(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const params = updateLeaderRequestSchema.parse(req.params);

    const updateLeaderRequestUseCase = makeUpdateLeaderRequestUseCase();
    await updateLeaderRequestUseCase.execute({
      id: params.id,
      isAccepted: params.isAccepted,
      requestUserId: req.user.sub,
    });

    return reply.status(200).send();
  } catch (error) {
    console.error(error);
    reply.status(400).send({ message: "Invalid request data." });
  }
}