import { SchedulesRepository } from "@/repositories/schedules-repository";
import { UsersRepository } from "@/repositories/users-repository";

export class RemoveParticipantScheduleUseCase {
    constructor(
        private schedulesRepository: SchedulesRepository,
        private usersRepository: UsersRepository,
    ) {}

    async execute(scheduleId: string, userId: string) {
        if(!scheduleId || !userId) {
            throw new Error('Schedule or user id is required');
        }

        const schedule = await this.schedulesRepository.findById(scheduleId);
        if(!schedule) {
            throw new Error('Schedule not found');
        }

        const participant = await this.schedulesRepository.findParticipant(scheduleId, userId);
        if(!participant) {
            throw new Error('Participant not found in schedule');
        }

        await this.schedulesRepository.removeParticipant(scheduleId, userId);
    }
}