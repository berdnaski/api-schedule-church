import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    console.error(err);
    return reply.status(401).send({ message: "Unauthorized" });
  }
}
