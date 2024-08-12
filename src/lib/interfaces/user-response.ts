import { DepartmentDTO } from "@/use-cases/dtos/department-dto";
import { Role } from "@prisma/client";

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    departments: DepartmentDTO[];
}
