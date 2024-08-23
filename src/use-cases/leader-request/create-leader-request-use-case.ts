import { LeaderRequestRepository } from "@/repositories/leader-request-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { LeaderRequest } from "@prisma/client";

interface CreateLeaderRequestDTO {
  userId: string;
  status: "PENDING";
}

export class CreateLeaderRequestUseCase {
  constructor(
    private leaderRequestRepository: LeaderRequestRepository,
    private userRepository: UsersRepository
  ) {}

  async execute(data: CreateLeaderRequestDTO): Promise<LeaderRequest> {
    const { userId, status } = data;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return this.leaderRequestRepository.create({
      userId,
      status,
      name: user.name,
    });
  }
}
