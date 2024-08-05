import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { RegisterUseCase } from "@/use-cases/register";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(1).max(100),
        email: z.string().email(),
        password: z.string().min(8).max(100),
    })

    const { name, email, password } = registerBodySchema.parse(req.body);

    try {
        const usersRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository)

        await registerUseCase.execute({
            name,
            email, 
            password,
        })
    } catch (err) {
        return reply.status(409).send();
    }
    return reply.status(201).send();
}