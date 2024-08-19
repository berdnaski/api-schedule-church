import { UsersRepository } from "@/repositories/users-repository";

export class GetUserUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute(userId: string) {
        return this.usersRepository.findById(userId);
    }
}