import { SchedulesRepository } from "@/repositories/schedules-repository";

export class UpdateParticipantStatusUseCase {
    constructor(
        private schedulesRepository: SchedulesRepository
    ) {}

    async execute(scheduleId: string, userId: string, status: 'ACCEPTED' | 'REJECTED', requestUserId: string) {
        if(requestUserId !== userId) {
            throw new Error('Unauthorized');
        }
        
        await this.schedulesRepository.updateParticipantStatus(scheduleId, userId, status);
    }
}