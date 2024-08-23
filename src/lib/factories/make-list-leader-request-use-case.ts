import { PrismaLeaderRequestRepository } from "@/repositories/prisma/prisma-leader-request-repository";
import { ListLeaderRequestsUseCase } from "@/use-cases/leader-request/list-leader-request-use-case";

export function makeListLeaderRequestsUseCase() {
  const leaderRequestRepository = new PrismaLeaderRequestRepository();
  return new ListLeaderRequestsUseCase(leaderRequestRepository);
}
