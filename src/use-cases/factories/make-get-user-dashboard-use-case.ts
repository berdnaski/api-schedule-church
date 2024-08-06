import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserDashboardUseCase } from "../get-user-dashboard";

export function makeGetUserDashboardUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const useCase = new GetUserDashboardUseCase(usersRepository)

    return useCase;
}