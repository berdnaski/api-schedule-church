import { Prisma, Department } from "@prisma/client";

export interface DepartmentsRepository {
    findById(id: string): Promise<Department | null>;
    listAll(): Promise<Department[]>;
    create(data: Prisma.DepartmentCreateInput): Promise<Department>;
}