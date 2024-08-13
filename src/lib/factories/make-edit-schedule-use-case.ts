import { PrismaSchedulesRepository } from "@/repositories/prisma/prisma-schedules-repository";
import { EditScheduleUseCase } from "@/use-cases/schedules/edit-schedule-use-case";

export function makeEditScheduleUseCase() {
    const schedulesRepository = new PrismaSchedulesRepository();
    const useCase = new EditScheduleUseCase(schedulesRepository)

    return useCase;
}
