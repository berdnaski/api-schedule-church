import { UpdateLeaderRequestUseCase } from "@/use-cases/leader-request/update-leader-request-use-case";
import { PrismaLeaderRequestRepository } from "@/repositories/prisma/prisma-leader-request-repository";

export function createUpdateLeaderRequestUseCase() {
  const leaderRequestRepo = new PrismaLeaderRequestRepository();
  return new UpdateLeaderRequestUseCase(leaderRequestRepo);
}
