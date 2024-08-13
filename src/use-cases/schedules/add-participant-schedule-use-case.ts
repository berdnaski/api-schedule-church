import { SchedulesRepository } from "@/repositories/schedules-repository";
import { UsersRepository } from "@/repositories/users-repository";

export class AddParticipantScheduleUseCase {
    constructor(
        private schedulesRepository: SchedulesRepository,
        private usersRepository: UsersRepository
    ) {}

    async execute(scheduleId: string, userId: string) {
        const schedule = await this.schedulesRepository.findById(scheduleId);
        if (!schedule) {
            throw new Error("Schedule not found");
        }

        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const departmentId = schedule.departmentId;
        if (!user.departments.some(department => department.id === departmentId)) {
            throw new Error("User is not a member of the department");
        }

        await this.schedulesRepository.addParticipant(scheduleId, userId);
    }
}
