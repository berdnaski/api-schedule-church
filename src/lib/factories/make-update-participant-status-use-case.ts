import { PrismaSchedulesRepository } from "@/repositories/prisma/prisma-schedules-repository";
import { UpdateParticipantStatusUseCase } from "@/use-cases/schedules/update-participant-status-use-case";

export function makeUpdateParticipantStatusUseCase() {
    const schedulesRepository = new PrismaSchedulesRepository();
    return new UpdateParticipantStatusUseCase(schedulesRepository);
}
