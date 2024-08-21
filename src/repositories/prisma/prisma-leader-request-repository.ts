import { PrismaClient, LeaderRequest } from "@prisma/client";
import { LeaderRequestRepository } from "@/repositories/leader-request-repository";

export class PrismaLeaderRequestRepository implements LeaderRequestRepository {
  private prisma = new PrismaClient();

  async findById(id: string): Promise<LeaderRequest | null> {
    try {
      return await this.prisma.leaderRequest.findUnique({ where: { id } });
    } catch (error) {
      console.error('Error finding leader request by ID:', error);
      throw new Error('Unable to find leader request');
    }
  }

  async create(userId: string, verificationCode: string): Promise<LeaderRequest> {
    try {
      return await this.prisma.leaderRequest.create({
        data: { 
          userId, 
          verificationCode, 
          status: 'PENDING' 
        }
      });
    } catch (error) {
      console.error('Error creating leader request:', error);
      throw new Error('Unable to create leader request');
    }
  }

  async updateStatus(requestId: string, status: 'ACCEPTED' | 'REJECTED'): Promise<void> {
    try {
      await this.prisma.leaderRequest.update({
        where: { id: requestId },
        data: { status },
      });
    } catch (error) {
      console.error('Error updating leader request status:', error);
      throw new Error('Unable to update leader request status');
    }
  }
}
