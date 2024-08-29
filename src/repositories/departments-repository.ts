import { Department, Prisma } from "@prisma/client";

export interface DepartmentsRepository {
    findById(id: string): Promise<Department | null>;
    listAll(): Promise<Department[]>;
    create(data: Prisma.DepartmentCreateInput): Promise<Department>;
    delete(id: string): Promise<void>;
    update(id: string, data: Prisma.DepartmentUpdateInput): Promise<Department>;
    findByUserId(userId: string): Promise<Department | null>;
}
