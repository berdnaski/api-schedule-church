import { createCreateLeaderRequestUseCase } from "@/lib/factories/make-create-leader-request-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const createLeaderRequestSchema = z.object({
  userId: z.string().uuid("ID do usuário deve ser um UUID válido"),
  status: z.literal("PENDING"),
});

export async function createLeaderRequest(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { userId, status } = createLeaderRequestSchema.parse(req.body);

    const createLeaderRequestUseCase = createCreateLeaderRequestUseCase();
    await createLeaderRequestUseCase.execute({
      userId,
      status,
    });

    reply.status(201).send({ message: "Solicitação criada com sucesso." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply.status(400).send({
        error: "Dados inválidos",
        details: error.errors,
      });
    } else {
      console.error(error);
      reply.status(500).send({ error: "Já existe uma solicitação pendente para este usuário." });
    }
  }
}
