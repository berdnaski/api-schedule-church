import { LeaderRequestRepository } from "@/repositories/leader-request-repository";
import { LeaderRequest } from "@prisma/client";

interface CreateLeaderRequestInput {
  id: string; 
}

export class CreateLeaderRequestUseCase {
  constructor(private leaderRequestRepo: LeaderRequestRepository) {}

  async execute(input: CreateLeaderRequestInput): Promise<LeaderRequest> {
    const { id } = input;

    const existingRequest = await this.leaderRequestRepo.findById(id);

    if (existingRequest) {
      throw new Error('Você já tem uma solicitação pendente.');
    }

    const verificationCode = this.generateVerificationCode();

    return this.leaderRequestRepo.create(id, verificationCode);
  }

  private generateVerificationCode(): string {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  }
}
