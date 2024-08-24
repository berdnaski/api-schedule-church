import { LeaderRequestRepository } from "@/repositories/leader-request-repository";
import { UpdateUserRoleUseCase } from "../users/update-user-role-use-case";
import { Role } from "@prisma/client";

interface UpdateLeaderRequestDTO {
  id: string;
  isAccepted: boolean;
  requestUserId: string;
}

export class UpdateLeaderRequestUseCase {
  constructor(
    private leaderRequestRepository: LeaderRequestRepository,
    private updateUserRoleUseCase: UpdateUserRoleUseCase
  ) {}

  async execute(data: UpdateLeaderRequestDTO) {

    const { id, isAccepted, requestUserId } = data;

    const status = isAccepted ? "ACCEPTED" : "REJECTED";
    console.log("status", status);
    
    await this.leaderRequestRepository.updateStatus(id, status);

    if(isAccepted) {
        const leaderRequest = await this.leaderRequestRepository.findById(id);
        if(!leaderRequest) {
            throw new Error('Invalid leader request');
        }

        const userId = leaderRequest.userId;

        await this.updateUserRoleUseCase.execute({
            adminId: requestUserId,
            userId: userId,
            newRole: "LEADER" as Role
        })
    }
  }
}
