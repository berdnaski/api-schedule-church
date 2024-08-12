import { PrismaClient, Department, Prisma, Schedule } from "@prisma/client";
import { SchedulesRepository } from "../schedules-repository";

const prisma = new PrismaClient();

export class PrismaSchedulesRepository implements SchedulesRepository {
    create(data: Prisma.ScheduleCreateInput){
        return prisma.schedule.create({
            data,
        })
    }

}
