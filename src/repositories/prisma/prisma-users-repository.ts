import { PrismaClient, User, Prisma, Role } from "@prisma/client";
import { UsersRepository } from "../users-repository";

const prisma = new PrismaClient();

export class PrismaUsersRepository implements UsersRepository {
    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
            include: { departments: true },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
            include: { departments: true },
        });
    }

    async listAll(): Promise<User[]> {
        return prisma.user.findMany({
            include: { departments: true },
        });
    }

    async listByDepartment(departmentId: string): Promise<User[]> {
        return prisma.user.findMany({
            where: {
                departments: {
                    some: {
                        id: departmentId,
                    },
                },
            },
            include: { departments: true },
        });
    }

    async updateRole(id: string, role: Role): Promise<User> {
        return prisma.user.update({
            where: { id },
            data: { role },
            include: { departments: true },
        });
    }

    async updateDepartment(userId: string, departmentId: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { departments: true },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return prisma.user.update({
            where: { id: userId },
            data: {
                departments: {
                    connect: { id: departmentId },
                },
            },
            include: { departments: true },
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({
            data,
            include: { departments: true },
        });
    }
}
