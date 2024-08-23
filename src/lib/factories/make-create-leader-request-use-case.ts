import { PrismaLeaderRequestRepository } from "@/repositories/prisma/prisma-leader-request-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateLeaderRequestUseCase } from "@/use-cases/leader-request/create-leader-request-use-case";

export function createCreateLeaderRequestUseCase() {
    const leaderRequestRepository = new PrismaLeaderRequestRepository();
    const userRepository = new PrismaUsersRepository();
    return new CreateLeaderRequestUseCase(leaderRequestRepository, userRepository);
}