import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UpdateUserRoleUseCase } from "@/use-cases/users/update-user-role-use-case";

export function makeUpdateUserRoleUseCase() {
    const usersRepository = new PrismaUsersRepository();
    return new UpdateUserRoleUseCase(usersRepository);
}