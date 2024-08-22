import { PrismaLeaderRequestRepository } from "@/repositories/prisma/prisma-leader-request-repository";
import { UpdateLeaderRequestUseCase } from "@/use-cases/leader-request/update-leader-request-use-case";

export function createUpdateLeaderRequestUseCase() {
  const leaderRequestRepository = new PrismaLeaderRequestRepository();
  return new UpdateLeaderRequestUseCase(leaderRequestRepository);
}
