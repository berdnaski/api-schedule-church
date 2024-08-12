import { Role } from "@prisma/client";

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}