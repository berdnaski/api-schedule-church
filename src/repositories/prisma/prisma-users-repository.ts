import { Prisma, Role, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    async listAll(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async updateRole(id: string, role: Role): Promise<User> {
        return prisma.user.update({
            where: { id },
            data: { role },
        });
    }

    async updateDepartment(userId: string, departmentId: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return prisma.user.update({
            where: { id: userId },
            data: { departmentId },
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({
            data,
        });
    }
}
