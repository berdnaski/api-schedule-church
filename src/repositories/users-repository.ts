import { Prisma, Role, User } from "@prisma/client";

export interface UsersRepository {
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    listAll(): Promise<User[]>
    updateRole(id: string, role: Role): Promise<User>
    create(data: Prisma.UserCreateInput): Promise<User>
}