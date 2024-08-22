import { LeaderRequestRepository } from "@/repositories/leader-request-repository";

interface CreateLeaderRequestDTO {
  userId: string;
  status: "PENDING";
}

export class CreateLeaderRequestUseCase {
  constructor(private leaderRequestRepository: LeaderRequestRepository) {}

  async execute(data: CreateLeaderRequestDTO) {
    const { userId, status } = data;
    return this.leaderRequestRepository.create({
      userId,
      status,
    });
  }
}
