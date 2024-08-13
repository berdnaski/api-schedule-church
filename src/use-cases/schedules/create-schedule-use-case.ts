import { Schedule } from "@prisma/client";
import { SchedulesRepository } from "@/repositories/schedules-repository";
import { DepartmentsRepository } from "@/repositories/departments-repository";
import { ScheduleDTO } from "../dtos/schedule-dto";

export class CreateScheduleUseCase {
    constructor(
        private scheduleRepository: SchedulesRepository,
        private departmentsRepository: DepartmentsRepository,
    ) {}

    async execute(departmentId: string, data: ScheduleDTO): Promise<Schedule> {
        const department = await this.departmentsRepository.findById(departmentId);
        
        if (!department) {
            throw new Error("Department not found");
        }

        return this.scheduleRepository.create({
            name: data.name,
            date: data.date,
            time: data.time,
            department: { connect: { id: departmentId } }
        });
    }
}
