import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

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
        if(err instanceof UserAlreadyExistsError) {
            reply.status(409).send({ message: err.message });
        }

        throw err;
    }
    return reply.status(201).send();
}