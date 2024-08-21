import { LeaderRequest, Prisma } from "@prisma/client";

export interface LeaderRequestRepository {
    create(data: { userId: string; status: 'PENDING' }): Promise<LeaderRequest>;
    findById(id: string): Promise<LeaderRequest | null>;
    updateStatus(id: string, status: 'ACCEPTED' | 'REJECTED'): Promise<LeaderRequest>;
    listAll(): Promise<LeaderRequest[]>;
}
