import { PrismaClient, LeaderRequest, User } from "@prisma/client";
import { LeaderRequestRepository } from "../leader-request-repository";

type LeaderRequestWithUser = LeaderRequest & { user: User };

export class PrismaLeaderRequestRepository implements LeaderRequestRepository {
  private prisma = new PrismaClient();

  async create(data: { userId: string; status: "PENDING"; name: string }): Promise<LeaderRequest> {
    return this.prisma.leaderRequest.create({
      data: {
        user: {
          connect: {
            id: data.userId
          }
        },
        status: data.status,
        name: data.name
      }
    });
  }

  async findById(id: string): Promise<LeaderRequest | null> {
    return this.prisma.leaderRequest.findUnique({
      where: { id },
    });
  }

  async updateStatus(id: string, status: "ACCEPTED" | "REJECTED"): Promise<LeaderRequest> {
    return this.prisma.leaderRequest.update({
      where: { id },
      data: { status },
    });
  }

  async findAll(): Promise<LeaderRequestWithUser[]> {
    return this.prisma.leaderRequest.findMany({
      where: {
        status: 'PENDING',
      },
      include: {
        user: true, 
      },
    });
  }
}
