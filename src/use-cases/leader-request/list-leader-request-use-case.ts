import { LeaderRequestRepository } from "@/repositories/leader-request-repository";
import { LeaderRequestDTO } from "../dtos/leader-request-dto";

export class ListLeaderRequestsUseCase {
  constructor(private leaderRequestRepository: LeaderRequestRepository) {}

  async execute(): Promise<{ leaderRequests: LeaderRequestDTO[] }> {
    const leaderRequests = await this.leaderRequestRepository.findAll();

    const listLeaderRequests: LeaderRequestDTO[] = leaderRequests.map(
      (request) => ({
        id: request.id,
        name: request.name,
        status: request.status,
      })
    );

    return { leaderRequests: listLeaderRequests };
  }
}
