import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyUserRole(...roles: ('MEMBER' | 'ADMIN' | 'LEADER')[]) {
    return async (req: FastifyRequest, reply: FastifyReply) => {
        const user = req.user as { role: 'MEMBER' | 'ADMIN' | 'LEADER' };

        if (!user || !roles.includes(user.role)) {
            return reply.status(403).send({ message: 'Forbidden' });
        }
    };
}
