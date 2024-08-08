import { UnauthorizedError } from "@/lib/errors/unauthorized-error";
import { UsersRepository } from "@/repositories/users-repository";
import { Role } from "@prisma/client";
import { UpdateUserRoleUseCaseRequest } from "../dtos/update-user-role-dto";

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
            user: {
                id: updatedUser.id,
                role: updatedUser.role
            }

        };
    }
}
