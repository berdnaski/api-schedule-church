import { SchedulesRepository } from "@/repositories/schedules-repository";
import { ScheduleDTO } from "../dtos/schedule-dto";

export class ListSchedulesUseCase {
    constructor(
        private schedulesRepository: SchedulesRepository
    ) {}

    async execute(departmentId?: string): Promise<{ schedules: ScheduleDTO[] }> {
        const schedules = departmentId 
            ? await this.schedulesRepository.findByDepartment(departmentId) 
            : await this.schedulesRepository.listAll();

        const listSchedules: ScheduleDTO[] = schedules.map(schedule => ({
            name: schedule.name,
            date: schedule.date,
            time: schedule.time,
            departmentId: schedule.departmentId
        }));

        return { schedules: listSchedules };
    }
}
