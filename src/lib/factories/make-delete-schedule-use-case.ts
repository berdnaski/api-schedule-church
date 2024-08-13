import { PrismaSchedulesRepository } from "@/repositories/prisma/prisma-schedules-repository";
import { SchedulesRepository } from "@/repositories/schedules-repository";
import { DeleteScheduleUseCase } from "@/use-cases/schedules/delete-schedule-use-case";

export function makeDeleteScheduleUseCase() {
    const schedulesRepository = new PrismaSchedulesRepository();
    return new DeleteScheduleUseCase(schedulesRepository);
}