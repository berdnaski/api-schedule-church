import { CreateLeaderRequestUseCase } from "@/use-cases/leader-request/create-leader-request-use-case";
import { PrismaLeaderRequestRepository } from "@/repositories/prisma/prisma-leader-request-repository";

export function createLeaderRequestFactory() {
  const leaderRequestRepo = new PrismaLeaderRequestRepository();
  return new CreateLeaderRequestUseCase(leaderRequestRepo);
}
