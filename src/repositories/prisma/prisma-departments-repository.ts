// src/repositories/prisma/prisma-departments-repository.ts
import { PrismaClient, Department, Prisma } from "@prisma/client";
import { DepartmentsRepository } from "../departments-repository";

const prisma = new PrismaClient();

export class PrismaDepartments implements DepartmentsRepository {
    async findById(id: string): Promise<Department | null> {
        return prisma.department.findUnique({
            where: {
                id,
            },
        });
    }

    async listAll(): Promise<Department[]> {
        return prisma.department.findMany();
    }

    async create(data: Prisma.DepartmentCreateInput): Promise<Department> {
        return prisma.department.create({
            data,
        });
    }
}
