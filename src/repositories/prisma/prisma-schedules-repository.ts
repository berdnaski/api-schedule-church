import { Prisma, PrismaClient, Schedule } from "@prisma/client";
import { SchedulesRepository } from "../schedules-repository";

export class PrismaSchedulesRepository implements SchedulesRepository {
    private prisma = new PrismaClient();

    async create(data: Prisma.ScheduleCreateInput): Promise<Schedule> {
        return this.prisma.schedule.create({ data });
    }

    async findById(id: string): Promise<Schedule | null> {
        return this.prisma.schedule.findUnique({ where: { id } });
    }

    async update(id: string, data: Prisma.ScheduleUpdateInput): Promise<Schedule | null> {
        return this.prisma.schedule.update({ where: { id }, data });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.schedule.delete({ where: { id } });
    }

    async addParticipant(scheduleId: string, userId: string): Promise<void> {
        const schedule = await this.prisma.schedule.findUnique({
            where: { id: scheduleId },
            include: { participants: true }
        });

        if (!schedule) {
            throw new Error("Schedule not found");
        }

        const isAlreadyParticipant = schedule.participants.some(participant => participant.userId === userId);
        if (isAlreadyParticipant) {
            throw new Error("User is already a participant in this schedule");
        }

        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }

        await this.prisma.scheduleParticipant.create({
            data: {
                scheduleId: scheduleId,
                userId: userId,
                status: 'PENDING' 
            }
        });
    }
}
