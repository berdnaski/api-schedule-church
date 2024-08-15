import { PrismaSchedulesRepository } from "@/repositories/prisma/prisma-schedules-repository";
import { ListSchedulesUseCase } from "@/use-cases/schedules/list-schedules-use-case";

export function makeListScheduleUseCase() {
    const scheduleRepository = new PrismaSchedulesRepository();

    return new ListSchedulesUseCase(scheduleRepository);
}