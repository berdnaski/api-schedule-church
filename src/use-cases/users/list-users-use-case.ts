import { UserResponse } from "@/lib/interfaces/user-response";
import { UsersRepository } from "@/repositories/users-repository";
import { ListUsersUseCaseResponse } from "../dtos/list-users-dto-response";

export class ListUsersUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute(): Promise<ListUsersUseCaseResponse> {
        const users = await this.usersRepository.listAll();

        const listUsers: UserResponse[] = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));

        return { users: listUsers };
    }
}
