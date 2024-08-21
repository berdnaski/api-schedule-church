import { PrismaLeaderRequestRepository } from "@/repositories/prisma/prisma-leader-request-repository";
import { CreateLeaderRequestUseCase } from "@/use-cases/leader-request/create-leader-request-use-case";

export function createCreateLeaderRequestUseCase() {
    const leaderRequestRepository = new PrismaLeaderRequestRepository();
    return new CreateLeaderRequestUseCase(leaderRequestRepository);
}