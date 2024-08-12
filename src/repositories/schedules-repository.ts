import { Prisma, Schedule } from "@prisma/client";

export interface SchedulesRepository {
    create(data: Prisma.ScheduleCreateInput): Promise<Schedule>
}