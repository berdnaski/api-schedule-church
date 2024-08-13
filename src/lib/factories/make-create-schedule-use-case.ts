import { PrismaDepartments } from "@/repositories/prisma/prisma-departments-repository";
import { PrismaSchedulesRepository } from "@/repositories/prisma/prisma-schedules-repository";
import { CreateScheduleUseCase } from "@/use-cases/schedules/create-schedule-use-case";

export function makeCreateScheduleUseCase() {
    const schedulesRepository = new PrismaSchedulesRepository();
    const departmentsRepository = new PrismaDepartments();

    return new CreateScheduleUseCase(
        schedulesRepository,
        departmentsRepository,
    );
}
