import { PrismaClient, LeaderRequest, Prisma } from "@prisma/client";
import { LeaderRequestRepository } from "@/repositories/leader-request-repository";

export class PrismaLeaderRequestRepository implements LeaderRequestRepository {
    private prisma = new PrismaClient();

    async create(data: { userId: string; status: 'PENDING' }): Promise<LeaderRequest> {
        return this.prisma.leaderRequest.create({
            data: {
                user: { connect: { id: data.userId } }, 
                status: data.status,
            },
        });
    }

    async findById(id: string): Promise<LeaderRequest | null> {
        return this.prisma.leaderRequest.findUnique({
            where: { id },
        });
    }

    async updateStatus(id: string, status: 'ACCEPTED' | 'REJECTED'): Promise<LeaderRequest> {
        return this.prisma.leaderRequest.update({
            where: { id },
            data: { status },
        });
    }

    async listAll(): Promise<LeaderRequest[]> {
        return this.prisma.leaderRequest.findMany();
    }
}
