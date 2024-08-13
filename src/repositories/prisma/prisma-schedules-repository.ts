// src/repositories/prisma/prisma-schedules-repository.ts
import { PrismaClient, Prisma, Schedule } from "@prisma/client";
import { SchedulesRepository } from "../schedules-repository";
import { EditScheduleDTO } from "@/use-cases/dtos/edit-schedule-dto";

const prisma = new PrismaClient();

export class PrismaSchedulesRepository implements SchedulesRepository {
    async delete(id: string) {
        await prisma.schedule.delete({
            where: {
                id,
            }
        })
    }
    async update(id: string, data: Partial<EditScheduleDTO>): Promise<Schedule | null> {
        return prisma.schedule.update({
            where: { id },
            data, 
        });
    }

    async findById(id: string): Promise<Schedule | null> {
        return prisma.schedule.findUnique({
            where: { id },
        });
    }

    async create(data: Prisma.ScheduleCreateInput): Promise<Schedule> {
        return prisma.schedule.create({
            data,
        });
    }
}
