import { Prisma, Role, User } from "@prisma/client";

export interface UsersRepository {
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    listAll(): Promise<User[]>
    listByDepartment(departmentId: string): Promise<User[]>
    updateRole(id: string, role: Role): Promise<User>
    updateDepartment(userId: string, departmentId: string, add: boolean): Promise<User>
    create(data: Prisma.UserCreateInput): Promise<User>
}