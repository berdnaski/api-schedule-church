import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

interface GetUserDashboardUseCaseRequest {
    userId: string;
}

interface GetUserDashboardUseCaseResponse {
    user: User;
}

export class GetUserDashboardUseCase {
    constructor(
        private usersRepository: UsersRepository,
    ) {}

    async execute({
        userId,
    }: GetUserDashboardUseCaseRequest): Promise<GetUserDashboardUseCaseResponse> {
        const user = await this.usersRepository.findById(userId);

        if(!user) {
            throw new Error('User not found');
        }

        return {
            user,
        }
    }
}