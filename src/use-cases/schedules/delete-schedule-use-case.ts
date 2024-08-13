import { SchedulesRepository } from "@/repositories/schedules-repository";

export class DeleteScheduleUseCase {
    constructor(
        private schedulesRepository: SchedulesRepository
    ) {}

    async execute(scheduleId: string): Promise<void> {
       const schedule = this.schedulesRepository.findById(scheduleId);

       if (!schedule) {
            throw new Error("Schedule not found");
        }

        await this.schedulesRepository.delete(scheduleId);
    }
}