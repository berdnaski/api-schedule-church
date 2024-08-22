import { PrismaLeaderRequestRepository } from "@/repositories/prisma/prisma-leader-request-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UpdateLeaderRequestUseCase } from "@/use-cases/leader-request/update-leader-request-use-case";
import { UpdateUserRoleUseCase } from "@/use-cases/users/update-user-role-use-case";

export function createUpdateLeaderRequestUseCase() {
  const leaderRequestRepository = new PrismaLeaderRequestRepository();
  const usersRepository = new PrismaUsersRepository();
  const updateUserRoleUseCase = new UpdateUserRoleUseCase(usersRepository);

  const updateLeaderRequestUseCase = new UpdateLeaderRequestUseCase(
    leaderRequestRepository,
    updateUserRoleUseCase
  );

  return updateLeaderRequestUseCase;
}
