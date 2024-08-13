import { PrismaSchedulesRepository } from "@/repositories/prisma/prisma-schedules-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AddParticipantScheduleUseCase } from '@/use-cases/schedules/add-participant-schedule-use-case';


export function makeAddParticipantScheduleUseCase() {
    const schedulesRepository = new PrismaSchedulesRepository();
    const usersRepository = new PrismaUsersRepository(); 

    const useCase = new AddParticipantScheduleUseCase(schedulesRepository, usersRepository);

    return useCase;
}
