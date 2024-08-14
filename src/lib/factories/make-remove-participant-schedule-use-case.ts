import { PrismaDepartments } from "@/repositories/prisma/prisma-departments-repository";
import { PrismaSchedulesRepository } from "@/repositories/prisma/prisma-schedules-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateScheduleUseCase } from "@/use-cases/schedules/create-schedule-use-case";
import { RemoveParticipantScheduleUseCase } from "@/use-cases/schedules/remove-participant-schedule-use-case";

export function makeRemoveParticipantScheduleUseCase() {
    const schedulesRepository = new PrismaSchedulesRepository();
    const usersRepository = new PrismaUsersRepository();

    return new RemoveParticipantScheduleUseCase(
        schedulesRepository,
        usersRepository,
    );
}
