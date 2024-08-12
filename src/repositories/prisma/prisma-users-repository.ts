import { PrismaClient, User, Prisma, Role } from "@prisma/client";
import { UsersRepository, UserWithDepartments } from "../users-repository";

const prisma = new PrismaClient();

export class PrismaUsersRepository implements UsersRepository {
    async findById(id: string): Promise<UserWithDepartments | null> {
        return prisma.user.findUnique({
            where: { id },
            include: { departments: true },
        }) as unknown as UserWithDepartments | null;
    }

    async findByEmail(email: string): Promise<UserWithDepartments | null> {
        return prisma.user.findUnique({
            where: { email },
            include: { departments: true },
        }) as unknown as UserWithDepartments | null;
    }

    async listAll(): Promise<UserWithDepartments[]> {
        return prisma.user.findMany({
            include: { departments: true },
        }) as unknown as UserWithDepartments[];
    }

    async listByDepartment(departmentId: string): Promise<UserWithDepartments[]> {
        return prisma.user.findMany({
            where: {
                departments: {
                    some: {
                        id: departmentId,
                    },
                },
            },
            include: { departments: true },
        }) as unknown as UserWithDepartments[];
    }

    async updateRole(id: string, role: Role): Promise<UserWithDepartments> {
        return prisma.user.update({
            where: { id },
            data: { role },
            include: { departments: true },
        }) as unknown as UserWithDepartments;
    }

    async updateDepartment(userId: string, departmentId: string, add: boolean): Promise<UserWithDepartments> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { departments: true },
        }) as unknown as UserWithDepartments | null;

        if (!user) {
            throw new Error("User not found");
        }

        const updateData: Prisma.UserUpdateInput = {
            departments: add ? {
                connect: { id: departmentId },
            } : {
                disconnect: { id: departmentId },
            },
        };

        return prisma.user.update({
            where: { id: userId },
            data: updateData,
            include: {
                departments: true,
            },
        }) as unknown as UserWithDepartments;
    }

    async create(data: Prisma.UserCreateInput): Promise<UserWithDepartments> {
        return prisma.user.create({
            data,
            include: { departments: true },
        }) as unknown as UserWithDepartments;
    }
}
