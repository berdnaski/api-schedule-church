import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: 'MEMBER' | 'ADMIN' | 'LEADER') {
    return async(req: FastifyRequest,reply: FastifyReply) => {
        const { role } = req.user;
    
        if (role !== roleToVerify) {
            return reply.status(401).send({ message: 'Unauthorized.' });
        }
    }
}