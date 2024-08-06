import { UsersRepository } from "@/repositories/users-repository";
import { UnauthorizedError } from "./errors/unauthorized-error";
import { Role } from "@prisma/client";

export interface UpdateUserRoleUseCaseRequest {
    adminId: string;  
    userId: string;  
    newRole: Role;  
}

export class UpdateUserRoleUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({
        adminId,
        userId,
        newRole,
    }: UpdateUserRoleUseCaseRequest) {
        const admin = await this.usersRepository.findById(adminId);
        if(!admin || admin.role !== "ADMIN") {
            throw new UnauthorizedError();
        }

        const user = await this.usersRepository.findById(userId);
        if(!user) {
            throw new Error("User not found");
        }

        const updatedUser = await this.usersRepository.updateRole(userId, newRole);
        return {
            user: updatedUser,
        };
    }
}
