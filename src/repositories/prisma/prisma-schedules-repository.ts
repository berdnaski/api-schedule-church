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

    async updateParticipantStatus(scheduleId: string, userId: string, status: 'ACCEPTED' | 'REJECTED'): Promise<void> {
        const scheduleParticipant = await this.prisma.scheduleParticipant.findUnique({
            where: {
                scheduleId_userId: {
                    scheduleId,
                    userId
                }
            }
        });

        if (!scheduleParticipant) {
            throw new Error("Participant not found in this schedule");
        }

        await this.prisma.scheduleParticipant.update({
            where: {
                id: scheduleParticipant.id
            },
            data: {
                status
            }
        });
    }

    async removeParticipant(scheduleId: string, userId: string) {
        await this.prisma.scheduleParticipant.deleteMany({
            where: {
                scheduleId,
                userId
            }
        });
    }

    async findParticipant(scheduleId: string, userId: string) {
        return this.prisma.scheduleParticipant.findUnique({
            where: {
                scheduleId_userId: {
                    scheduleId,
                    userId
                }
            }
        });
    }

    async listAll(): Promise<Schedule[]> {
        return this.prisma.schedule.findMany();
    }

    async findByDepartment(departmentId: string): Promise<Schedule[]> {
        return this.prisma.schedule.findMany({
            where: { departmentId },
        });
    }
}
