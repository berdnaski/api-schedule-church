import { SchedulesRepository } from "@/repositories/schedules-repository";
import { EditScheduleDTO } from "../dtos/edit-schedule-dto";

export class EditScheduleUseCase {
    constructor(
        private schedulesRepository: SchedulesRepository,
    ) {}

    async execute(scheduleId: string, data: Partial<EditScheduleDTO>) {
        const schedule = await this.schedulesRepository.findById(scheduleId);

        if (!schedule) {
            throw new Error("Schedule not found");
        }

        const updatedSchedule = await this.schedulesRepository.update(scheduleId, data);

        return updatedSchedule; 
    }
}
