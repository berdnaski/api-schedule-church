import { Prisma, Schedule, ScheduleParticipant } from "@prisma/client";

export interface SchedulesRepository {
    create(data: Prisma.ScheduleCreateInput): Promise<Schedule>
    findById(id: string): Promise<Schedule | null>
    update(id: string, data: Prisma.ScheduleUpdateInput): Promise<Schedule | null>
    delete(id: string): Promise<void>
    addParticipant(scheduleId: string, userId: string): Promise<void>;
    updateParticipantStatus(scheduleId: string, userId: string, status: 'ACCEPTED' | 'REJECTED'): Promise<void>;
    findParticipant(scheduleId: string, userId: string): Promise<ScheduleParticipant | null>
    removeParticipant(scheduleId: string, userId: string): Promise<void>;
    listAll(): Promise<Schedule[]>;
    findByDepartment(departmentId: string): Promise<Schedule[]>;
}