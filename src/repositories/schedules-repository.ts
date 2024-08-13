import { Prisma, Schedule } from "@prisma/client";

export interface SchedulesRepository {
    create(data: Prisma.ScheduleCreateInput): Promise<Schedule>
    findById(id: string): Promise<Schedule | null>
    update(id: string, data: Prisma.ScheduleUpdateInput): Promise<Schedule | null>
    delete(id: string): Promise<void>
    addParticipant(scheduleId: string, userId: string): Promise<void>;
}