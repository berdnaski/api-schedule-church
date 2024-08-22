import { LeaderRequestRepository } from "@/repositories/leader-request-repository";

interface UpdateLeaderRequestDTO {
  id: string;
  isAccepted: boolean;
}

export class UpdateLeaderRequestUseCase {
  constructor(private leaderRequestRepository: LeaderRequestRepository) {}

  async execute(data: UpdateLeaderRequestDTO) {
    const { id, isAccepted } = data;
    const status = isAccepted ? "ACCEPTED" : "REJECTED";
    console.log("status", status);
    return this.leaderRequestRepository.updateStatus(id, status);
  }
}
