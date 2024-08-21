import { LeaderRequest } from "@prisma/client";

export interface LeaderRequestRepository {
  findById(id: string): Promise<LeaderRequest | null>; // Encontra uma solicitação pelo ID
  create(userId: string, verificationCode: string): Promise<LeaderRequest>; // Cria uma nova solicitação
  updateStatus(requestId: string, status: 'ACCEPTED' | 'REJECTED'): Promise<void>; // Atualiza o status de uma solicitação
}
