import { Role } from "@prisma/client";

export interface UpdateUserRoleUseCaseRequest {
    adminId: string;  
    userId: string;  
    newRole: Role;  
}