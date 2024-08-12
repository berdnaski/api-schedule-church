import { User, Prisma, Role } from "@prisma/client";
import { DepartmentDTO } from "@/use-cases/dtos/department-dto";

export interface UsersRepository {
    findById(id: string): Promise<UserWithDepartments | null>;
    findByEmail(email: string): Promise<UserWithDepartments | null>;
    listAll(): Promise<UserWithDepartments[]>;
    listByDepartment(departmentId: string): Promise<UserWithDepartments[]>;
    updateRole(id: string, role: Role): Promise<User>;
    updateDepartment(userId: string, departmentId: string, add: boolean): Promise<User>;
    create(data: Prisma.UserCreateInput): Promise<User>;
}

export interface UserWithDepartments extends User {
    departments: DepartmentDTO[];
}
