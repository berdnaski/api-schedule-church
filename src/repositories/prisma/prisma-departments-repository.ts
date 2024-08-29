import { PrismaClient, Department, Prisma } from "@prisma/client";
import { DepartmentsRepository } from "../departments-repository";

const prisma = new PrismaClient();

export class PrismaDepartments implements DepartmentsRepository {
    async findById(id: string): Promise<Department | null> {
        return prisma.department.findUnique({
            where: { id },
        });
    }

    async listAll(): Promise<Department[]> {
        return prisma.department.findMany();
    }

    async delete(id: string): Promise<void> { 
        await prisma.department.delete({
            where: { id },
        });
    }

    update(id: string, data: Prisma.DepartmentUpdateInput): Promise<Department> {
        return prisma.department.update({
            where: { id },
            data,
        });
    }

    async findByUserId(userId: string): Promise<Department | null> {
        return prisma.department.findFirst({
            where: { userId },
        });
    }

    async create(data: Prisma.DepartmentCreateInput): Promise<Department> {
        return prisma.department.create({
            data,
        });
    }
}
