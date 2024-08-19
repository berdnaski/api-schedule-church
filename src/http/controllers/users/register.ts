import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/lib/errors/user-already-exists-error";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "@/use-cases/users/register";

export async function register(req: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(req.body);

    try {
        const usersRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        const { user } = await registerUseCase.execute({
            name,
            email,
            password,
        });

        const token = await reply.jwtSign(
            {
                role: user.role,
            },
            {
                sign: {
                    sub: user.id,
                },
            },
        );

        const refreshToken = await reply.jwtSign(
            {
                role: user.role,
            },
            {
                sign: {
                    sub: user.id,
                    expiresIn: '7d',
                },
            },
        );

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .status(201)
            .send({
                token,
            });
            
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }

        console.error("Register error:", err); 
        return reply.status(500).send({ message: "Internal server error." });
    }
}