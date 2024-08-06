import { makeCreateDepartmentsUseCase } from "@/use-cases/factories/make-create-departments-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createDepartment(req: FastifyRequest, reply: FastifyReply) {
    const createDepartmentSchema = z.object({
        name: z.string().min(1),
        description: z.string(),
    });

    const { name, description } = createDepartmentSchema.parse(req.body);

    try {
        const createDepartmentUseCase = makeCreateDepartmentsUseCase();
        const department = await createDepartmentUseCase.execute({
            name,
            description,
        });

        return reply.status(201).send(department);
    } catch (err) {
        if(err instanceof Error) {
            return reply.status(400).send({ message: err.message });
        }
    }
}