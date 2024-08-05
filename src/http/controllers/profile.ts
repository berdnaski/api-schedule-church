import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(req: FastifyRequest, reply: FastifyReply) {
    await req.jwtVerify();

    console.log(req.user.sub);
    
    return reply.status(200).send();
}