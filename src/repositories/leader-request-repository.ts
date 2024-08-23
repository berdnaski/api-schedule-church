import { LeaderRequest } from "@prisma/client";

export interface LeaderRequestRepository {
  create(data: { userId: string; status: "PENDING"; name: string }): Promise<LeaderRequest>;
  findById(id: string): Promise<LeaderRequest | null>;
  updateStatus(
    id: string,
    status: "ACCEPTED" | "REJECTED"
  ): Promise<LeaderRequest>;
  findAll(): Promise<LeaderRequest[]>;
}
